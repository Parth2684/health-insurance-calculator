import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className="relative">
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center h-10 w-10 rounded-full border-2 ${
                index < currentIndex 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : index === currentIndex
                    ? 'border-blue-600 text-blue-600'
                    : 'border-gray-300 text-gray-300'
              } transition-colors`}>
                {index < currentIndex ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-xs font-medium ${
                index <= currentIndex ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${
                index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile view */}
      <div className="sm:hidden">
        <p className="text-sm font-medium text-blue-600">
          Step {currentIndex + 1} of {steps.length}: {steps[currentIndex].label}
        </p>
        <div className="mt-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-2 bg-blue-600 rounded-full" 
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};