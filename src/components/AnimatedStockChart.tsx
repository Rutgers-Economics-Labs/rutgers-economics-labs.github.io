"use client";

import { useEffect, useRef } from "react";

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 400;
const STEP = 8;
const MAX_INDEX = 125;

type Point = { x: number; y: number };

function priceAt(index: number) {
  const longWave = Math.sin(index * 0.105) * 36;
  const shortWave = Math.sin(index * 0.33 + 0.8) * 10;
  const trend = index * 0.28;
  return Math.max(82, Math.min(318, 200 + longWave + shortWave - trend));
}

function predictionFrom(index: number) {
  return Array.from({ length: 30 }, (_, offset) => {
    const futureIndex = index + offset + 1;
    return { x: futureIndex * STEP, y: priceAt(futureIndex) + Math.sin(futureIndex * 0.7) * 5 };
  }).filter((point) => point.x <= SVG_WIDTH);
}

function pointsToPath(points: Point[]) {
  return points.length ? points.map((point, index) => `${index ? 'L' : 'M'}${point.x},${point.y}`).join(' ') : '';
}

export default function AnimatedStockChart() {
  const stockPathRef = useRef<SVGPathElement>(null);
  const predictionPathRef = useRef<SVGPathElement>(null);
  const currentPointRef = useRef<SVGCircleElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let lastUpdate = 0;
    let pausedUntil = 0;

    const render = (activeIndex: number) => {
      const history = Array.from({ length: activeIndex + 1 }, (_, pointIndex) => ({ x: pointIndex * STEP, y: priceAt(pointIndex) }));
      const currentPoint = history[history.length - 1];
      stockPathRef.current?.setAttribute('d', pointsToPath(history));
      predictionPathRef.current?.setAttribute('d', pointsToPath(predictionFrom(activeIndex)));
      currentPointRef.current?.setAttribute('cx', String(currentPoint.x));
      currentPointRef.current?.setAttribute('cy', String(currentPoint.y));
    };

    if (reduceMotion) {
      render(72);
      return;
    }

    const animate = (timestamp: number) => {
      if (pausedUntil && timestamp < pausedUntil) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      if (!lastUpdate || timestamp - lastUpdate >= 85) {
        lastUpdate = timestamp;
        render(index);
        index += 1;
        if (index > MAX_INDEX) {
          index = 0;
          pausedUntil = timestamp + 650;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <svg className="stock-chart" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
      <path ref={stockPathRef} className="chart-line" d="M0,200" />
      <path ref={predictionPathRef} className="prediction-line" d="M0,200" />
      <circle ref={currentPointRef} cx="0" cy="200" r="6" fill="#DC2626" stroke="#f87171" strokeWidth="2" />
    </svg>
  );
}
