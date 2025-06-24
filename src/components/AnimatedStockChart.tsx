import React, { useEffect, useRef } from "react";

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 400;
const MAX_INDEX = 125;
const STEP = 8;

function generateNextStockPoint(previousPrice: number, index: number) {
  const trendComponent = Math.sin(index * 0.05) * 25;
  const volatilityComponent = (Math.random() - 0.5) * 15;
  const meanReversion = (200 - previousPrice) * 0.02;
  let newPrice = previousPrice + trendComponent * 0.2 + volatilityComponent + meanReversion;
  newPrice = Math.max(80, Math.min(320, newPrice));
  return newPrice;
}

function generatePredictionFromCurrent(currentPrice: number, startX: number, currentIndex: number) {
  const points = [];
  let price = currentPrice;
  for (let i = 1; i <= 30; i++) {
    const x = startX + i * STEP;
    const trend = Math.sin((currentIndex + i) * 0.05) * 20;
    const uncertainty = (Math.random() - 0.5) * 8;
    price += trend * 0.15 + uncertainty;
    price = Math.max(80, Math.min(320, price));
    points.push({ x, y: price });
    if (x > SVG_WIDTH) break;
  }
  return points;
}

function pointsToPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return '';
  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L${points[i].x},${points[i].y}`;
  }
  return path;
}

const AnimatedStockChart: React.FC = () => {
  const stockPathRef = useRef<SVGPathElement>(null);
  const predictionPathRef = useRef<SVGPathElement>(null);
  const currentPointRef = useRef<SVGCircleElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    let stockData: { x: number; y: number }[] = [];
    let currentIndex = 0;
    let animationRunning = false;

    function animateChart() {
      if (animationRunning) return;
      animationRunning = true;
      if (
        currentIndex >= MAX_INDEX ||
        (stockData.length > 0 && stockData[stockData.length - 1].x >= SVG_WIDTH)
      ) {
        stockData = [];
        currentIndex = 0;
        const initialPrice = 150 + (Math.random() - 0.5) * 100;
        stockData.push({ x: 0, y: initialPrice });
      }
      function updateFrame() {
        if (!animationRunning) return;
        if (currentIndex < MAX_INDEX) {
          const x = currentIndex * STEP;
          const lastPrice = stockData.length > 0 ? stockData[stockData.length - 1].y : 200;
          const newPrice = generateNextStockPoint(lastPrice, currentIndex);
          stockData.push({ x, y: newPrice });
          currentIndex++;
          // Update stock path
          if (stockPathRef.current) {
            stockPathRef.current.setAttribute('d', pointsToPath(stockData));
          }
          // Update current point
          const currentStockPoint = stockData[stockData.length - 1];
          if (currentPointRef.current) {
            currentPointRef.current.setAttribute('cx', String(currentStockPoint.x));
            currentPointRef.current.setAttribute('cy', String(currentStockPoint.y));
          }
          // Update prediction
          const predictionData = generatePredictionFromCurrent(currentStockPoint.y, currentStockPoint.x, currentIndex);
          if (predictionPathRef.current) {
            predictionPathRef.current.setAttribute('d', pointsToPath(predictionData));
          }
        }
        if (currentIndex < MAX_INDEX) {
          animationRef.current = window.setTimeout(() => requestAnimationFrame(updateFrame), 100);
        } else {
          setTimeout(() => {
            animationRunning = false;
            animateChart();
          }, 200);
        }
      }
      updateFrame();
    }
    // Start animation after mount
    const timeout = setTimeout(animateChart, 1000);
    return () => {
      clearTimeout(timeout);
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  return (
    <svg className="stock-chart" viewBox="0 0 1000 400" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.4 }}>
      <path ref={stockPathRef} className="chart-line" d="M0,200" fill="none" stroke="#DC2626" strokeWidth={3} opacity={0.9} />
      <path ref={predictionPathRef} className="prediction-line" d="M0,200" fill="none" stroke="#FFFF00" strokeWidth={2} strokeDasharray="8,4" opacity={0.8} />
      <circle ref={currentPointRef} className="current-point" cx={0} cy={200} r={8} fill="#DC2626" stroke="#FF4444" strokeWidth={2} opacity={1} />
    </svg>
  );
};

export default AnimatedStockChart; 