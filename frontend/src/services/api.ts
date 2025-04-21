import { FormData, PremiumResults } from '../hooks/useInsuranceForm';

const API_URL = 'http://localhost:5000';

export const calculateInsurancePremium = async (formData: Required<FormData>): Promise<PremiumResults> => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Failed to calculate premium');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};