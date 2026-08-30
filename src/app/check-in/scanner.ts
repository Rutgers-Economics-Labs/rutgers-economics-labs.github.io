'use client';

import type { OcrResult } from './types';

type Cv = typeof import('@techstark/opencv-js');

declare global {
  interface Window {
    cv?: Cv | Promise<Cv>;
  }
}

let cvPromise: Promise<Cv> | null = null;
let workerPromise: Promise<Awaited<ReturnType<typeof import('tesseract.js')['createWorker']>>> | null = null;

async function getCv(): Promise<Cv> {
  if (!cvPromise) {
    cvPromise = new Promise<void>((resolve, reject) => {
      if (window.cv) return resolve();
      const script = document.createElement('script');
      script.src = '/check-in-assets/opencv.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('OpenCV could not load.'));
      document.head.appendChild(script);
    }).then(async () => {
      const candidate = (await Promise.resolve(window.cv)) as Cv;
      if (candidate.Mat) return candidate;
      await new Promise<void>((resolve) => {
        (candidate as Cv & { onRuntimeInitialized?: () => void }).onRuntimeInitialized = resolve;
      });
      return candidate;
    });
  }
  return cvPromise;
}

async function getWorker(onProgress?: (progress: number) => void) {
  if (!workerPromise) {
    workerPromise = import('tesseract.js').then(({ createWorker }) =>
      createWorker('eng', 1, {
        workerPath: '/check-in-assets/worker.min.js',
        corePath: '/check-in-assets/core',
        langPath: '/check-in-assets/lang',
        logger: (message) => {
          if (message.status === 'recognizing text') onProgress?.(message.progress || 0);
        },
      }),
    );
  }
  return workerPromise;
}

type Point = { x: number; y: number };

function orderPoints(points: Point[]) {
  const sum = points.map((point) => point.x + point.y);
  const diff = points.map((point) => point.y - point.x);
  return [
    points[sum.indexOf(Math.min(...sum))],
    points[diff.indexOf(Math.min(...diff))],
    points[sum.indexOf(Math.max(...sum))],
    points[diff.indexOf(Math.max(...diff))],
  ];
}

export async function detectAndFlattenCard(source: HTMLCanvasElement, output: HTMLCanvasElement) {
  const cv = await getCv();
  const src = cv.imread(source);
  const resized = new cv.Mat();
  const gray = new cv.Mat();
  const blurred = new cv.Mat();
  const edges = new cv.Mat();
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  const maxWidth = 760;
  const scale = Math.min(1, maxWidth / src.cols);
  const size = new cv.Size(Math.round(src.cols * scale), Math.round(src.rows * scale));
  let best: Point[] | null = null;
  let bestArea = 0;

  try {
    cv.resize(src, resized, size, 0, 0, cv.INTER_AREA);
    cv.cvtColor(resized, gray, cv.COLOR_RGBA2GRAY);
    cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);
    cv.Canny(blurred, edges, 55, 150);
    cv.findContours(edges, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

    const frameArea = resized.cols * resized.rows;
    for (let index = 0; index < contours.size(); index += 1) {
      const contour = contours.get(index);
      const area = cv.contourArea(contour);
      if (area < frameArea * 0.09 || area <= bestArea) {
        contour.delete();
        continue;
      }
      const perimeter = cv.arcLength(contour, true);
      const approx = new cv.Mat();
      cv.approxPolyDP(contour, approx, 0.025 * perimeter, true);
      if (approx.rows === 4) {
        const points: Point[] = [];
        for (let point = 0; point < 4; point += 1) {
          points.push({ x: approx.data32S[point * 2] / scale, y: approx.data32S[point * 2 + 1] / scale });
        }
        const ordered = orderPoints(points);
        const width = Math.hypot(ordered[1].x - ordered[0].x, ordered[1].y - ordered[0].y);
        const height = Math.hypot(ordered[3].x - ordered[0].x, ordered[3].y - ordered[0].y);
        const ratio = Math.max(width, height) / Math.max(1, Math.min(width, height));
        if (ratio > 1.25 && ratio < 2.1) {
          best = ordered;
          bestArea = area;
        }
      }
      approx.delete();
      contour.delete();
    }

    if (!best) return false;
    const portrait = Math.hypot(best[1].x - best[0].x, best[1].y - best[0].y) < Math.hypot(best[3].x - best[0].x, best[3].y - best[0].y);
    const width = portrait ? 540 : 856;
    const height = portrait ? 856 : 540;
    const sourceCorners = cv.matFromArray(4, 1, cv.CV_32FC2, best.flatMap((point) => [point.x, point.y]));
    const destinationCorners = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, width, 0, width, height, 0, height]);
    const transform = cv.getPerspectiveTransform(sourceCorners, destinationCorners);
    const flattened = new cv.Mat();
    cv.warpPerspective(src, flattened, transform, new cv.Size(width, height), cv.INTER_LINEAR, cv.BORDER_REPLICATE);
    cv.imshow(output, flattened);
    sourceCorners.delete();
    destinationCorners.delete();
    transform.delete();
    flattened.delete();
    return true;
  } finally {
    src.delete();
    resized.delete();
    gray.delete();
    blurred.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();
  }
}

const BLOCKED_WORDS = new Set([
  'rutgers', 'university', 'student', 'identification', 'new', 'brunswick', 'camden', 'newark',
  'valid', 'until', 'issued', 'campus', 'scarlet', 'knights', 'rucard', 'library', 'member',
]);

export function extractLikelyName(rawText: string, confidence: number): OcrResult {
  const candidates = rawText
    .split(/\n+/)
    .map((line) => line.replace(/[^A-Za-z' -]/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((line) => {
      const words = line.toLowerCase().split(' ').filter(Boolean);
      return words.length >= 2 && words.length <= 5 && line.length >= 5 && line.length <= 60 && !words.some((word) => BLOCKED_WORDS.has(word));
    })
    .sort((a, b) => {
      const score = (value: string) => value.split(' ').filter((word) => word.length > 1).length * 12 - Math.abs(value.length - 18);
      return score(b) - score(a);
    });
  const name = candidates[0] || '';
  const titleCase = name
    .toLocaleLowerCase()
    .replace(/(^|[ '-])([a-z])/g, (_match, prefix: string, letter: string) => `${prefix}${letter.toLocaleUpperCase()}`);
  return { name: titleCase, confidence: name ? Math.round(confidence) : 0, rawText };
}

export async function recognizeName(cardCanvas: HTMLCanvasElement, onProgress?: (progress: number) => void) {
  const worker = await getWorker(onProgress);
  const { data } = await worker.recognize(cardCanvas, undefined, { text: true });
  return extractLikelyName(data.text, data.confidence);
}
