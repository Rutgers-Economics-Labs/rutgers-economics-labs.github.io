import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="gradient-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img src="/images/REL Logo.JPEG" alt="REL Logo" className="w-10 h-10 rounded-full" />
            <h4 className="text-white text-xl font-bold">Rutgers Economics Labs</h4>
          </div>
          <p className="text-red-100 mb-6">Empowering students through economic research</p>
          <div className="flex justify-center space-x-6 mb-6">
            <Link to="/contact" className="text-red-200 hover:text-white transition-colors duration-300">
              Contact
            </Link>
            <a 
              href="https://www.linkedin.com/company/rutgers-economics-labs" 
              className="text-red-200 hover:text-white transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a 
              href="https://www.instagram.com/rutgers.economics.labs" 
              className="text-red-200 hover:text-white transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <Link to="/projects" className="text-red-200 hover:text-white transition-colors duration-300">
              Research
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-red-700">
            <p className="text-red-200 text-sm">© 2025 Rutgers Economics Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;