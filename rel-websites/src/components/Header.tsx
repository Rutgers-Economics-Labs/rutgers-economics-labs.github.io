"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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
  return (
    <nav className="gradient-bg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/REL Logo.JPEG" alt="REL Logo" className="w-10 h-10 rounded-full" />
              <h1 className="text-white text-xl font-bold">Rutgers Economics Labs</h1>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                href={link.to}
                className={`nav-link text-white hover:text-gray-200 font-medium${pathname === link.to ? ' underline' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) menu.classList.toggle('hidden');
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-red-700 py-4">
        <div className="space-y-2 px-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              href={link.to}
              className="block text-white hover:text-gray-200 py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header; 