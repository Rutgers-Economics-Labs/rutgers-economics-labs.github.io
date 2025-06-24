import React from 'react';
import { Mail, Linkedin, Instagram, ExternalLink, Heart, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

const Footer = () => (
  <footer className="gradient-bg py-16 mt-8 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-red-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
        
        {/* Logo and Description */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-6 group">
            <div className="relative">
              <Image 
                src={"/images/REL Logo.JPEG"}
                alt="REL Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-white/30" 
              />
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h4 className="text-white text-xl font-bold transition-all duration-300 group-hover:text-red-100">
              Rutgers Economics Labs
            </h4>
          </div>
          <p className="text-red-100 mb-6 leading-relaxed">
            Empowering students through economic research and hands-on learning experiences that shape the future of economics.
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-2 text-red-200">
            <Heart className="w-4 h-4 text-red-300" />
            <span className="text-sm">Made with passion at Rutgers University</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h5 className="text-white text-lg font-semibold mb-6 flex items-center justify-center space-x-2">
            <ExternalLink className="w-5 h-5" />
            <span>Quick Links</span>
          </h5>
          <div className="space-y-3">
            {[
              { label: 'Research Projects', href: '/projects' },
              { label: 'About Us', href: '/about' },
              { label: 'Join Our Team', href: '/apply' },
              { label: 'Resources', href: '/resources' },
              { label: 'Meet the Team', href: '/people' }
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block text-red-200 hover:text-white transition-all duration-300 hover:translate-x-2 group"
              >
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-1 h-1 bg-red-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>{link.label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact and Social */}
        <div className="text-center md:text-right">
          <h5 className="text-white text-lg font-semibold mb-6 flex items-center justify-center md:justify-end space-x-2">
            <Mail className="w-5 h-5" />
            <span>Connect With Us</span>
          </h5>
          
          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center md:justify-end space-x-2 text-red-200">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Rutgers University, New Brunswick</span>
            </div>
            <div className="flex items-center justify-center md:justify-end space-x-2 text-red-200">
              <Mail className="w-4 h-4" />
              <span className="text-sm">rel@rutgerseconomicslabs.org</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="mailto:rel@rutgerseconomicslabs.org"
              className="group relative p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Email us"
            >
              <Mail className="w-5 h-5 text-white group-hover:text-red-100 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a
              href="https://www.linkedin.com/company/rutgers-economics-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white group-hover:text-red-100 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a
              href="https://www.instagram.com/rutgers.economics.labs"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5 text-white group-hover:text-red-100 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-red-700/50">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-red-200 text-sm flex items-center space-x-2">
            <span>© 2025 Rutgers Economics Labs. All rights reserved.</span>
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-red-200 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-red-200 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-red-200 hover:text-white transition-colors duration-300">Accessibility</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 