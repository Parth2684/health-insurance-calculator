import React from 'react';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { FormData } from '../../hooks/useInsuranceForm';

interface HealthInfoStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const HealthInfoStep: React.FC<HealthInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onBack 
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.bmi || formData.bmi < 10 || formData.bmi > 50) {
      newErrors.bmi = 'Please enter a valid BMI between 10 and 50';
    }
    
    if (formData.children === undefined || formData.children < 0) {
      newErrors.children = 'Please enter a valid number of children';
    }
    
    if (!formData.smoker) {
      newErrors.smoker = 'Please select smoking status';
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

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Health Information</h2>
      
      <div className="mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-700 text-sm">
            Your health details help us determine the most accurate premium estimate. 
            All information is kept confidential and secure.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="BMI (Body Mass Index)"
          error={errors.bmi}
          type="number"
          id="bmi"
          name="bmi"
          value={formData.bmi || ''}
          onChange={(e) => updateFormData({ bmi: Number(e.target.value) })}
          min={10}
          max={50}
          step={0.1}
          required
          placeholder="Enter your BMI"
          helpText="BMI is calculated as weight(kg) / height²(m)"
        />
        
        <FormField
          label="Number of Children"
          error={errors.children}
          type="number"
          id="children"
          name="children"
          value={formData.children === undefined ? '' : formData.children}
          onChange={(e) => updateFormData({ children: Number(e.target.value) })}
          min={0}
          max={10}
          required
          placeholder="Enter number of children"
        />
        
        <FormField
          label="Smoking Status"
          error={errors.smoker}
          id="smoker"
          name="smoker"
          type="select"
          value={formData.smoker || ''}
          onChange={(e) => updateFormData({ smoker: e.target.value })}
          required
          options={[
            { value: '', label: 'Select status' },
            { value: 'yes', label: 'Smoker' },
            { value: 'no', label: 'Non-smoker' }
          ]}
        />
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
};