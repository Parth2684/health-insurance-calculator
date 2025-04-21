import React from 'react';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { FormData } from '../../hooks/useInsuranceForm';

interface PolicyInfoStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const PolicyInfoStep: React.FC<PolicyInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onBack,
  isLoading
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.policy_term || formData.policy_term < 1 || formData.policy_term > 30) {
      newErrors.policy_term = 'Please enter a valid policy term between 1 and 30 years';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  const policyOptions = [
    { 
      id: 'basic', 
      title: 'Basic', 
      description: 'Essential coverage for individuals',
      features: ['Emergency coverage', 'Basic prescription benefits', 'Limited specialist visits']
    },
    { 
      id: 'standard', 
      title: 'Standard', 
      description: 'Comprehensive coverage for families',
      features: ['Full emergency coverage', 'Enhanced prescription benefits', 'Regular specialist visits', 'Preventative care']
    },
    { 
      id: 'premium', 
      title: 'Premium', 
      description: 'Complete coverage with extra benefits',
      features: ['Complete coverage', 'Premium prescription benefits', 'Unlimited specialist visits', 'Comprehensive preventative care', 'Wellness programs']
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Policy Information</h2>
      
      <div className="mb-8">
        <FormField
          label="Policy Term (years)"
          error={errors.policy_term}
          type="number"
          id="policy_term"
          name="policy_term"
          value={formData.policy_term || ''}
          onChange={(e) => updateFormData({ policy_term: Number(e.target.value) })}
          min={1}
          max={30}
          required
          placeholder="Enter policy term in years"
        />
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Policy Type (for information only)
        </label>
        <div className="grid md:grid-cols-3 gap-4">
          {policyOptions.map((option) => (
            <div 
              key={option.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                formData.policyType === option.id 
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
              onClick={() => updateFormData({ policyType: option.id })}
            >
              <h3 className="font-semibold text-gray-800">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{option.description}</p>
              <ul className="text-xs text-gray-500 list-disc list-inside">
                {option.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Calculate Premium
        </Button>
      </div>
    </form>
  );
};