"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/resources', label: 'Resources' },
  { to: '/people', label: 'People' },
  { to: '/apply', label: 'Apply' },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="gradient-bg shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image 
                  src={"/images/REL Logo.JPEG"} 
                  alt="REL Logo" 
                  className="w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-white/30" 
                  width={48}
                  height={48}
                />
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h1 className="text-white text-xl font-bold transition-all duration-300 group-hover:text-red-100 group-hover:scale-105">
                Rutgers Economics Labs
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                href={link.to}
                className={`relative px-4 py-2 text-white font-medium transition-all duration-300 rounded-lg group overflow-hidden ${
                  pathname === link.to 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'hover:bg-white/10'
                }`}
              >
                {/* Background animation on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-red-200/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                
                {/* Text with hover effect */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {link.label}
                </span>
                
                {/* Bottom border animation */}
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
                  pathname === link.to 
                    ? 'scale-x-100' 
                    : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg shadow-lg shadow-white/20"></div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300 group"
            onClick={toggleMobileMenu}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute top-0 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
              }`}></span>
              <span className={`absolute top-2.5 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`absolute top-5 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-red-700/95 backdrop-blur-sm border-t border-red-600/50">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-white hover:text-red-100 py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-2 ${
                  pathname === link.to ? 'bg-white/20 text-white' : ''
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                }}
              >
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Header; 