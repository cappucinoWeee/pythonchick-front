// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-auto py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <img src="/logo.png" alt="Pythonchick" className="h-8 inline-block mr-2" />
            <span className="font-display text-primary text-xl">Pythonchick</span>
            <p className="text-sm text-gray-600 mt-1">
              Learn coding through adventure!
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-primary">
              About Us
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-primary">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Pythonchick. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
