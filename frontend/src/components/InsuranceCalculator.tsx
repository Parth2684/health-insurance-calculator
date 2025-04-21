import React, { useState } from 'react';
import { PersonalInfoStep } from './form-steps/PersonalInfoStep';
import { HealthInfoStep } from './form-steps/HealthInfoStep';
import { PolicyInfoStep } from './form-steps/PolicyInfoStep';
import { ResultsView } from './ResultsView';
import { StepIndicator } from './ui/StepIndicator';
import { useInsuranceForm } from '../hooks/useInsuranceForm';

type Step = 'personal' | 'health' | 'policy' | 'results';

export const InsuranceCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { formData, updateFormData, premiumResults, calculatePremium } = useInsuranceForm();

  const steps = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'health', label: 'Health Details' },
    { id: 'policy', label: 'Policy Options' },
    { id: 'results', label: 'Your Quote' },
  ];

  const handleNext = async () => {
    if (currentStep === 'personal') {
      setCurrentStep('health');
    } else if (currentStep === 'health') {
      setCurrentStep('policy');
    } else if (currentStep === 'policy') {
      setIsLoading(true);
      setError(null);
      try {
        await calculatePremium();
        setCurrentStep('results');
      } catch (err) {
        setError('Failed to calculate premium. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'health') {
      setCurrentStep('personal');
    } else if (currentStep === 'policy') {
      setCurrentStep('health');
    } else if (currentStep === 'results') {
      setCurrentStep('policy');
    }
  };

  const handleStartOver = () => {
    setCurrentStep('personal');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
        Insurance Premium Calculator
      </h1>
      <p className="text-center text-gray-600 mb-8 md:mb-12">
        Get a personalized insurance quote in just a few steps
      </p>

      <StepIndicator steps={steps} currentStep={currentStep} />

      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 mt-8">
        {currentStep === 'personal' && (
          <PersonalInfoStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
          />
        )}
        
        {currentStep === 'health' && (
          <HealthInfoStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        
        {currentStep === 'policy' && (
          <PolicyInfoStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack} 
            isLoading={isLoading} 
          />
        )}
        
        {currentStep === 'results' && premiumResults && (
          <ResultsView 
            results={premiumResults} 
            onBack={handleBack} 
            onStartOver={handleStartOver}
          />
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};