import React from 'react';
import { Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
            InsureGuard
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
            Services
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
            Contact
          </a>
        </nav>
        <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
          Get a Quote
        </button>
      </div>
    </header>
  );
};