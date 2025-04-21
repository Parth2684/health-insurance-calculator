import React, { useState } from 'react';
import axios from 'axios';

export default function InsuranceCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male',
    bmi: '',
    children: '',
    smoker: 'no',
    region: 'southeast',
    income: '',
    policy_term: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setResult(res.data);
    } catch (error) {
      alert('Prediction failed!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🧾 Insurance Premium Calculator</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} className="w-full px-4 py-2 rounded-xl border border-gray-300" required />
            <select name="sex" onChange={handleChange} value={formData.sex} className="w-full px-4 py-2 rounded-xl border border-gray-300">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type="number" step="0.1" name="bmi" placeholder="BMI" onChange={handleChange} value={formData.bmi} className="w-full px-4 py-2 rounded-xl border border-gray-300" required />
            <input type="number" name="children" placeholder="Number of Children" onChange={handleChange} value={formData.children} className="w-full px-4 py-2 rounded-xl border border-gray-300" required />
            <select name="smoker" onChange={handleChange} value={formData.smoker} className="w-full px-4 py-2 rounded-xl border border-gray-300">
              <option value="no">Non-Smoker</option>
              <option value="yes">Smoker</option>
            </select>
            <select name="region" onChange={handleChange} value={formData.region} className="w-full px-4 py-2 rounded-xl border border-gray-300">
              <option value="southeast">Southeast</option>
              <option value="southwest">Southwest</option>
              <option value="northeast">Northeast</option>
              <option value="northwest">Northwest</option>
            </select>
            <input type="number" name="income" placeholder="Annual Income (₹)" onChange={handleChange} value={formData.income} className="w-full px-4 py-2 rounded-xl border border-gray-300" required />
            <input type="number" name="policy_term" placeholder="Policy Term (years)" onChange={handleChange} value={formData.policy_term} className="w-full px-4 py-2 rounded-xl border border-gray-300" required />
            <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg transition">{loading ? 'Calculating...' : 'Get Premium'}</button>
          </form>
        </div>

        {result && (
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 shadow-inner flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">📊 Result Summary</h3>
            <p><strong>Base Premium:</strong> ₹{result.base_premium}</p>
            <p><strong>Tax (18%):</strong> ₹{result.tax}</p>
            <p><strong>Total Payable:</strong> ₹{result.total}</p>
            <p><strong>Yearly Payment:</strong> ₹{result.yearly_payment}</p>
            <div className="mt-6">
              <p className="text-sm text-gray-600">Note: This is an estimate based on your inputs. Actual premiums may vary.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}