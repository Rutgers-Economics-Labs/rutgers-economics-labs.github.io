import { useEffect, useRef } from "react";
import nj from "@/data/nj-counties.json";

// Local equirectangular projection corrects longitude scale at NJ's latitude.
const projectNJ = ([lon, lat]: number[]) => [(lon + 75.6) * .766, 41.4 - lat];
const countyPaths = nj.counties.map(county => county.rings.map(ring => ring.map(projectNJ)));

// Decorative, deterministic sample data; not live market data.
const trend = (x: number) => .76 - .48 * x + Math.sin(x * 16) * .11 + Math.sin(x * 53) * .025;
const stockSamples = Array.from({ length: 101 }, (_, i) =>
  trend(i / 100) + Math.sin(i * 7.31) * .018
);

export default function AnimatedStockChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Stock line → correlation → bars → donut → New Jersey. Start on a
    // different scene for each mount while preserving the existing sequence.
    const sceneDuration = 10_000;
    let width = 0, height = 0, elapsed = Math.floor(Math.random() * 5) * sceneDuration, previous = 0, frame = 0;
    let visible = true;
    const smooth = (x: number) => { const t = Math.max(0, Math.min(1, x)); return t * t * (3 - 2 * t); };

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const seconds = motion.matches ? 9 : elapsed / 1000;
      const scene = Math.floor(seconds / 10) % 5;
      const blend = smooth((seconds % 10 - 8) / 2);
      const weights = [0, 0, 0, 0, 0];
      weights[scene] = 1 - blend;
      weights[(scene + 1) % 5] = blend;
      if (motion.matches) weights.splice(0, 5, 1, 0, 0, 0, 0);
      const [trendAlpha, correlation, bars, donut, map] = weights;
      // Start the next trace during its fade-in, then append points without
      // moving or resampling any completed segment.
      const trendTime = (seconds + 2) % 50;
      const progress = motion.matches ? .82 : .06 + .82 * Math.min(trendTime / 12, 1);
      const samplePosition = progress * 100;
      const completed = Math.floor(samplePosition);
      const fraction = samplePosition - completed;
      const endY = stockSamples[completed] +
        (stockSamples[Math.min(completed + 1, 100)] - stockSamples[completed]) * fraction;
      const y = (value: number) => height * (.1 + value * .8);
      const line = (alpha: number, color: string, points: number[][], dash: number[] = []) => {
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8;
        ctx.setLineDash(dash);
        ctx.beginPath();
        points.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
        ctx.stroke();
        ctx.setLineDash([]);
      };

      // A fine grid anchors both views without competing with the copy.
      for (let row = 1; row < 6; row++) {
        line(.035, "#ffffff", [[0, height * row / 6], [width, height * row / 6]]);
      }

      const points = stockSamples.slice(0, completed + 1).map((value, i) =>
        [i / 100 * width, y(value)]
      );
      points.push([progress * width, y(endY)]);
      line(.55 * trendAlpha, "#ef4444", points);
      // Reforecast from the fixed tip: changing slope and small angular
      // revisions affect only the projection, never the observed history.
      const forecastSteps = 24;
      const forecastSlope = Math.sin(seconds * 1.15) * .55;
      const future = Array.from({ length: forecastSteps + 1 }, (_, i) => {
        const t = i / forecastSteps;
        const x = progress + t * .25;
        const revision = (
          Math.sin(i * 1.7 + seconds * 1.8) * .018 +
          Math.sin(i * .55 - seconds * 1.3) * .03
        ) * t;
        return [x * width, y(endY + t * .25 * forecastSlope + revision)];
      });
      const fanWidth = height * (.055 + .015 * Math.sin(seconds * .8));
      ctx.globalAlpha = .07 * trendAlpha;
      ctx.fillStyle = "#fca5a5";
      ctx.beginPath();
      future.forEach(([px, py], i) => ctx.lineTo(px, py - i / forecastSteps * fanWidth));
      [...future].reverse().forEach(([px, py], i) => ctx.lineTo(px, py + (forecastSteps - i) / forecastSteps * fanWidth));
      ctx.closePath();
      ctx.fill();
      line(.4 * trendAlpha, "#e8bc64", future, [5, 8]);
      const [tipX, tipY] = points[points.length - 1];
      ctx.globalAlpha = .12 * trendAlpha;
      ctx.fillStyle = "#f87171";
      ctx.beginPath(); ctx.arc(tipX, tipY, 10, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = .7 * trendAlpha;
      ctx.beginPath(); ctx.arc(tipX, tipY, 3, 0, Math.PI * 2); ctx.fill();

      // Correlation begins fading in at second 8: observations first, fit second.
      const correlationTime = (seconds - 8 + 50) % 50;
      const fitProgress = smooth((correlationTime - 3) / 2.5);
      if (fitProgress > 0) {
        line(.32 * correlation, "#f5bd96", [[0, y(.85)], [width * fitProgress, y(.85 - .7 * fitProgress)]]);
      }
      const count = width < 600 ? 38 : 72;
      for (let i = 0; i < count; i++) {
        const x = ((i * 137.508) % 1000) / 1000;
        const scatter = Math.sin(i * 8.3) * .13;
        const drift = Math.sin(seconds * .65 + i) * .035;
        const appear = smooth((correlationTime - i / count * 2) / .7);
        const py = .85 - .7 * x + scatter + drift + (1 - appear) * .035;
        ctx.globalAlpha = correlation * appear * (.24 + (i % 3) * .07);
        ctx.fillStyle = i % 5 ? "#f87171" : "#f5bd96";
        ctx.beginPath(); ctx.arc(x * width, y(py), 2 + i % 3 * .5, 0, Math.PI * 2); ctx.fill();
      }
      // Bars rise and fall continuously, with a traveling highlight.
      if (bars > 0) {
        const columns = width < 600 ? 12 : 26;
        const step = width / columns;
        for (let i = 0; i < columns; i++) {
          const amplitude = .17 + .22 * (1 + Math.sin(i * .65 + seconds * .6)) / 2;
          const barHeight = height * amplitude;
          ctx.globalAlpha = bars * (.12 + .08 * (1 + Math.sin(i - seconds)) / 2);
          ctx.fillStyle = i % 5 ? "#ef4444" : "#f5bd96";
          ctx.fillRect(i * step + step * .18, height * .88 - barHeight, step * .64, barHeight);
          line(bars * .35, "#f87171", [[i * step + step * .18, height * .88 - barHeight], [i * step + step * .82, height * .88 - barHeight]]);
        }
      }
      // A large donut uses pixel geometry so it stays circular on phones.
      if (donut > 0) {
        const radius = Math.min(width * .38, height * .38);
        const cx = width * .5, cy = height * .5;
        const values = [0, 1, 2, 3, 4].map(i => 1.3 + Math.sin(seconds * .38 + i * 1.4) * .35);
        const total = values.reduce((sum, value) => sum + value, 0);
        let angle = seconds * .045;
        values.forEach((value, i) => {
          const arc = value / total * Math.PI * 2;
          ctx.globalAlpha = donut * .22;
          ctx.strokeStyle = ["#ef4444", "#f5bd96", "#b91c1c", "#f87171", "#a8a29e"][i];
          ctx.lineWidth = radius * .2;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, angle + .025, angle + arc - .025);
          ctx.stroke();
          angle += arc;
        });
      }
      if (map > 0) {
        const scale = Math.min(height * .82 / 2.5, width * .8 / 1.6);
        const offsetX = width / 2 - .6653 * scale;
        const offsetY = height / 2 - 1.2556 * scale;
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);
        countyPaths.forEach((rings, index) => {
          const colorPhase = (seconds * .3 + index * .67) % 4;
          const palette = [[239,68,68], [232,188,100], [94,168,161], [151,122,184]];
          const from = palette[Math.floor(colorPhase)];
          const to = palette[(Math.floor(colorPhase) + 1) % palette.length];
          const mix = smooth(colorPhase % 1);
          ctx.beginPath();
          rings.forEach(ring => {
            ring.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
            ctx.closePath();
          });
          ctx.globalAlpha = map * .26;
          ctx.fillStyle = `rgb(${from.map((channel, i) => Math.round(channel + (to[i] - channel) * mix)).join(",")})`;
          ctx.fill("evenodd");
          ctx.globalAlpha = map * .5;
          ctx.strokeStyle = "#fca5a5";
          ctx.lineWidth = 1 / scale;
          ctx.stroke();
        });
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    function tick(now: number) {
      elapsed += previous ? Math.min(now - previous, 100) : 0;
      previous = now;
      draw();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      previous = 0;
      draw();
      if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resize.observe(canvas);
    intersection.observe(canvas);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <div className="hero-chart-background" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}><canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} /><div className="hero-chart-shade" /></div>;
}
