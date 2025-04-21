import React from 'react';
import { Shield, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">InsureGuard</span>
            </div>
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
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Health Insurance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Life Insurance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Home Insurance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Auto Insurance</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Insurance Ave</li>
              <li>New York, NY 10001</li>
              <li>+1 (555) 123-4567</li>
              <li>support@insureguard.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 InsureGuard. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookies Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};