import { useState } from 'react';
import { calculateInsurancePremium } from '../services/api';

export interface FormData {
  age?: number;
  sex?: string;
  bmi?: number;
  children?: number;
  smoker?: string;
  region?: string;
  income?: number;
  policy_term?: number;
  policyType?: string;
}

export interface PremiumResults {
  base_premium: string;
  tax: string;
  total: string;
  yearly_payment: string;
  claimable_amount: string;
}

export const useInsuranceForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [premiumResults, setPremiumResults] = useState<PremiumResults | null>(null);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateFormData = () => {
    const requiredFields = [
      'age', 'sex', 'bmi', 'children', 
      'smoker', 'region', 'income', 'policy_term'
    ];
    
    for (const field of requiredFields) {
      if (formData[field as keyof FormData] === undefined) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  };

  const calculatePremium = async () => {
    validateFormData();
    
    try {
      const results = await calculateInsurancePremium(formData as Required<FormData>);
      setPremiumResults(results);
      return results;
    } catch (error) {
      console.error('Error calculating premium:', error);
      throw error;
    }
  };

  return {
    formData,
    updateFormData,
    premiumResults,
    calculatePremium
  };
};