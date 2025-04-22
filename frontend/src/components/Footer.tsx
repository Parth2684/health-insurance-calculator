import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">InsureGuard</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Protecting what matters most with transparent, affordable insurance solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors">Health Insurance</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors">Life Insurance</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors">Home Insurance</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors">Auto Insurance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Regions</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Northeast India</li>
              <li>Northwest India</li>
              <li>Southeast India</li>
              <li>Southwest India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 InsureGuard. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-blue-400 transition-colors">Cookies Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};