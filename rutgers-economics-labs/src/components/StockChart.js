import React, { useEffect, useRef } from 'react';

const StockChart = () => {
  const stockPathRef = useRef();
  const predictionPathRef = useRef();
  const currentPointRef = useRef();
  const animationRunning = useRef(false);
  const stockData = useRef([]);
  const predictionData = useRef([]);
  const currentIndex = useRef(0);

  // Generate continuous stock data points
  const generateNextStockPoint = (previousPrice, index) => {
    const trendComponent = Math.sin(index * 0.05) * 25;
    const volatilityComponent = (Math.random() - 0.5) * 15;
    const meanReversion = (200 - previousPrice) * 0.02;
    
    let newPrice = previousPrice + trendComponent * 0.2 + volatilityComponent + meanReversion;
    
    // Keep price in reasonable bounds
    newPrice = Math.max(80, Math.min(320, newPrice));
    
    return newPrice;
  };

  // Generate prediction from current point
  const generatePredictionFromCurrent = (currentPrice, startX) => {
    const points = [];
    let price = currentPrice;
    
    // Generate prediction points
    for (let i = 1; i <= 30; i++) {
      const x = startX + (i * 8);
      
      // Prediction with some optimistic bias and smoothing
      const trend = Math.sin((currentIndex.current + i) * 0.05) * 20;
      const uncertainty = (Math.random() - 0.5) * 8; // Less volatile than actual
      
      price += trend * 0.15 + uncertainty;
      price = Math.max(80, Math.min(320, price));
      
      points.push({ x, y: price });
      
      if (x > 1000) break; // Don't go beyond SVG bounds
    }
    
    return points;
  };

  // Convert points to SVG path
  const pointsToPath = (points) => {
    if (points.length === 0) return '';
    
    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L${points[i].x},${points[i].y}`;
    }
    return path;
  };

  // Main animation function
  const animateChart = () => {
    if (animationRunning.current) return;
    animationRunning.current = true;
    
    // Reset if we've reached the end
    if (currentIndex.current >= 125 || (stockData.current.length > 0 && stockData.current[stockData.current.length - 1].x >= 1000)) {
      stockData.current = [];
      predictionData.current = [];
      currentIndex.current = 0;
      
      // Start with random initial price
      const initialPrice = 150 + (Math.random() - 0.5) * 100;
      stockData.current.push({ x: 0, y: initialPrice });
    }
    
    const updateFrame = () => {
      if (!animationRunning.current) return;
      
      // Add new stock data point
      if (currentIndex.current < 125) {
        const x = currentIndex.current * 8; // 8 pixels per step
        const lastPrice = stockData.current.length > 0 ? stockData.current[stockData.current.length - 1].y : 200;
        const newPrice = generateNextStockPoint(lastPrice, currentIndex.current);
        
        stockData.current.push({ x, y: newPrice });
        currentIndex.current++;
        
        // Update stock path
        if (stockPathRef.current) {
          stockPathRef.current.setAttribute('d', pointsToPath(stockData.current));
        }
        
        // Update current point position
        const currentStockPoint = stockData.current[stockData.current.length - 1];
        if (currentPointRef.current) {
          currentPointRef.current.setAttribute('cx', currentStockPoint.x);
          currentPointRef.current.setAttribute('cy', currentStockPoint.y);
        }
        
        // Generate and update prediction
        predictionData.current = generatePredictionFromCurrent(currentStockPoint.y, currentStockPoint.x);
        if (predictionData.current.length > 0 && predictionPathRef.current) {
          predictionPathRef.current.setAttribute('d', pointsToPath(predictionData.current));
        }
      }
      
      // Continue animation
      if (currentIndex.current < 125) {
        setTimeout(() => requestAnimationFrame(updateFrame), 100); // ~10fps for smooth but visible movement
      } else {
        // Wait a moment then restart
        setTimeout(() => {
          animationRunning.current = false;
          animateChart();
        }, 200);
      }
    };
    
    updateFrame();
  };

  useEffect(() => {
    // Start animation when component mounts
    const timer = setTimeout(animateChart, 1000);
    
    return () => {
      clearTimeout(timer);
      animationRunning.current = false;
    };
  }, []);

  return (
    <svg className="stock-chart" viewBox="0 0 1000 400" preserveAspectRatio="none">
      {/* Historical stock line */}
      <path ref={stockPathRef} className="chart-line" d="M0,200"></path>
      {/* Prediction line */}
      <path ref={predictionPathRef} className="prediction-line" d="M0,200"></path>
      {/* Current point indicator */}
      <circle ref={currentPointRef} className="current-point" cx="0" cy="200" r="8"></circle>
    </svg>
  );
};

export default StockChart;