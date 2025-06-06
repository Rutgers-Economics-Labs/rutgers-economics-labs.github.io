import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StockChart from '../components/StockChart';

const Home = () => {
  useEffect(() => {
    // Add fade-in effect to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 200);
    });

    // Intersection Observer for scroll animations
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="animated-bg min-h-screen flex items-center relative overflow-hidden">
        <StockChart />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in">
              Rutgers Economics Labs
            </h2>
            <p className="text-xl md:text-2xl text-white mb-8 fade-in max-w-3xl mx-auto">
              Student-driven economic research for government agencies, think tanks, and public policy organizations
            </p>
            <Link 
              to="/about" 
              className="pulse-red bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 fade-in inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-8 fade-in">Our Mission</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed fade-in">
              We are a student organization at Rutgers University that conducts pro bono economic research for government agencies, think tanks, and other public policy organizations. Our mission is to provide Rutgers students with research opportunities in the social sciences while producing data-driven insights that inform policymakers.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center card-hover bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-red-600 mb-2">2</div>
              <div className="text-gray-600 font-medium">Talented Student Teams</div>
            </div>
            <div className="text-center card-hover bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-red-600 mb-2">3+</div>
              <div className="text-gray-600 font-medium">Partner Organizations</div>
            </div>
            <div className="text-center card-hover bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Analysts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;