import React from 'react';
import { Shield, Users, TrendingUp, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About InsureGuard</h1>
        <p className="text-lg text-gray-600">
          Protecting what matters most with innovative insurance solutions
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-gray-600 leading-relaxed">
          Founded in 2025, InsureGuard has been at the forefront of revolutionizing the insurance industry 
          through advanced AI technology and customer-centric solutions. Our mission is to make insurance 
          more accessible, transparent, and tailored to individual needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
          </div>
          <p className="text-gray-600">
            To provide innovative insurance solutions that protect and empower our customers, 
            using cutting-edge technology to deliver personalized coverage at competitive rates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
          </div>
          <p className="text-gray-600">
            To become the most trusted name in insurance by leveraging AI technology 
            to provide transparent, efficient, and customer-focused insurance services.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose InsureGuard?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Premium Service</h3>
            <p className="text-gray-600">Dedicated support and exceptional customer service</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expert Team</h3>
            <p className="text-gray-600">Professional advisors with years of experience</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reliable Coverage</h3>
            <p className="text-gray-600">Comprehensive protection for your peace of mind</p>
          </div>
        </div>
      </div>
    </div>
  );
};