import React from 'react';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { FormData } from '../../hooks/useInsuranceForm';

interface PersonalInfoStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext 
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.age || formData.age < 18 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age between 18 and 120';
    }
    
    if (!formData.sex) {
      newErrors.sex = 'Please select your gender';
    }
    
    if (!formData.region) {
      newErrors.region = 'Please select your region';
    }
    
    if (!formData.income || formData.income <= 0) {
      newErrors.income = 'Please enter a valid income';
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Age"
          error={errors.age}
          type="number"
          id="age"
          name="age"
          value={formData.age || ''}
          onChange={(e) => updateFormData({ age: Number(e.target.value) })}
          min={18}
          max={120}
          required
          placeholder="Enter your age"
        />
        
        <FormField
          label="Gender"
          error={errors.sex}
          id="sex"
          name="sex"
          type="select"
          value={formData.sex || ''}
          onChange={(e) => updateFormData({ sex: e.target.value })}
          required
          options={[
            { value: '', label: 'Select gender' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ]}
        />

        <FormField
          label="Region"
          error={errors.region}
          id="region"
          name="region"
          type="select"
          value={formData.region || ''}
          onChange={(e) => updateFormData({ region: e.target.value })}
          required
          options={[
            { value: '', label: 'Select region' },
            { value: 'northeast', label: 'Northeast' },
            { value: 'northwest', label: 'Northwest' },
            { value: 'southeast', label: 'Southeast' },
            { value: 'southwest', label: 'Southwest' }
          ]}
        />
        
        <FormField
          label="Annual Income ($)"
          error={errors.income}
          type="number"
          id="income"
          name="income"
          value={formData.income || ''}
          onChange={(e) => updateFormData({ income: Number(e.target.value) })}
          min={0}
          step={1000}
          required
          placeholder="Enter your annual income"
        />
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
};