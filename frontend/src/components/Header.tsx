import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600';
  };

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
            InsureGuard
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`transition-colors ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/about" className={`transition-colors ${isActive('/about')}`}>
            About
          </Link>
          <Link to="/services" className={`transition-colors ${isActive('/services')}`}>
            Services
          </Link>
          <Link to="/contact" className={`transition-colors ${isActive('/contact')}`}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};