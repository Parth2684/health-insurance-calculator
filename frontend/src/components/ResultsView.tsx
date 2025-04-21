import React from 'react';
import { Button } from './ui/Button';
import { PremiumResults } from '../hooks/useInsuranceForm';
import { DollarSign, AlertCircle, Shield, ArrowRight } from 'lucide-react';

interface ResultsViewProps {
  results: PremiumResults;
  onBack: () => void;
  onStartOver: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ results, onBack, onStartOver }) => {
  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
          <Shield className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Insurance Quote</h2>
        <p className="text-gray-600">Based on the information you provided</p>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-blue-700 font-medium mb-1">Monthly Premium</p>
            <p className="text-3xl font-bold text-blue-900">
              ₹
{(parseFloat(results.yearly_payment) / 12).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-blue-700 font-medium mb-1">Annual Premium</p>
            <p className="text-3xl font-bold text-blue-900">
              ₹
{results.yearly_payment}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800">Premium Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Base Premium</p>
                <p className="text-lg font-semibold text-gray-800">₹
{results.base_premium}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-100 text-indigo-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tax</p>
                <p className="text-lg font-semibold text-gray-800">₹
{results.tax}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600">
                  <Shield className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Premium</p>
                <p className="text-lg font-semibold text-gray-800">₹
{results.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-amber-100 text-amber-600">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Claimable Amount</p>
                <p className="text-lg font-semibold text-gray-800">₹
{results.claimable_amount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Steps</h3>
        <p className="text-gray-600 mb-4">
          Ready to proceed with this insurance plan? Our agents are available to assist you with the application process.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button>
            Apply Now
          </Button>
          <Button variant="outline">
            Contact an Agent
          </Button>
        </div>
      </div> */}
      
      <div className="flex flex-col sm:flex-row justify-between mt-8">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button variant="ghost" onClick={onStartOver}>
          Start Over
        </Button>
      </div>
    </div>
  );
};