// Stock price animation with continuous updating
let stockData = [];
let predictionData = [];
let currentIndex = 0;
let animationRunning = false;

// Generate continuous stock data points
function generateNextStockPoint(previousPrice, index) {
    // Create realistic stock movement with trends and volatility
    const trendComponent = Math.sin(index * 0.05) * 25;
    const volatilityComponent = (Math.random() - 0.5) * 15;
    const meanReversion = (200 - previousPrice) * 0.02;
    
    let newPrice = previousPrice + trendComponent * 0.2 + volatilityComponent + meanReversion;
    
    // Keep price in reasonable bounds
    newPrice = Math.max(80, Math.min(320, newPrice));
    
    return newPrice;
}

// Generate prediction from current point
function generatePredictionFromCurrent(currentPrice, startX) {
    const points = [];
    let price = currentPrice;
    
    // Generate prediction points
    for (let i = 1; i <= 30; i++) {
        const x = startX + (i * 8);
        
        // Prediction with some optimistic bias and smoothing
        const trend = Math.sin((currentIndex + i) * 0.05) * 20;
        const uncertainty = (Math.random() - 0.5) * 8; // Less volatile than actual
        
        price += trend * 0.15 + uncertainty;
        price = Math.max(80, Math.min(320, price));
        
        points.push({ x, y: price });
        
        if (x > 1000) break; // Don't go beyond SVG bounds
    }
    
    return points;
}

// Convert points to SVG path
function pointsToPath(points) {
    if (points.length === 0) return '';
    
    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        path += ` L${points[i].x},${points[i].y}`;
    }
    return path;
}

// Main animation function
function animateChart() {
    if (animationRunning) return;
    animationRunning = true;
    
    // Reset if we've reached the end
    if (currentIndex >= 125 || (stockData.length > 0 && stockData[stockData.length - 1].x >= 1000)) {
        stockData = [];
        predictionData = [];
        currentIndex = 0;
        
        // Start with random initial price
        const initialPrice = 150 + (Math.random() - 0.5) * 100;
        stockData.push({ x: 0, y: initialPrice });
    }
    
    const stockPath = document.getElementById('stockPath');
    const predictionPath = document.getElementById('predictionPath');
    const currentPoint = document.getElementById('currentPoint');
    
    function updateFrame() {
        if (!animationRunning) return;
        
        // Add new stock data point
        if (currentIndex < 125) {
            const x = currentIndex * 8; // 8 pixels per step
            const lastPrice = stockData.length > 0 ? stockData[stockData.length - 1].y : 200;
            const newPrice = generateNextStockPoint(lastPrice, currentIndex);
            
            stockData.push({ x, y: newPrice });
            currentIndex++;
            
            // Update stock path
            stockPath.setAttribute('d', pointsToPath(stockData));
            
            // Update current point position
            const currentStockPoint = stockData[stockData.length - 1];
            currentPoint.setAttribute('cx', currentStockPoint.x);
            currentPoint.setAttribute('cy', currentStockPoint.y);
            
            // Generate and update prediction
            predictionData = generatePredictionFromCurrent(currentStockPoint.y, currentStockPoint.x);
            if (predictionData.length > 0) {
                predictionPath.setAttribute('d', pointsToPath(predictionData));
            }
        }
        
        // Continue animation
        if (currentIndex < 125) {
            setTimeout(() => requestAnimationFrame(updateFrame), 100); // ~10fps for smooth but visible movement
        } else {
            // Wait a moment then restart
            setTimeout(() => {
                animationRunning = false;
                animateChart();
            }, 200);
        }
    }
    
    updateFrame();
}

// Start animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in effect to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });
    
    // Start stock animation
    setTimeout(animateChart, 1000);
});

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Trigger fade-in animations
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 500);

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Form submission
document.getElementById('mailing-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for joining our mailing list! We\'ll keep you updated on our latest news and opportunities.');
    this.reset();
}); 
