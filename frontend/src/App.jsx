import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    age: "",
    bmi: "",
    children: "",
    sex: "male",
    smoker: "no",
    region: "northeast",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          bmi: parseFloat(formData.bmi),
          children: parseInt(formData.children),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`Predicted Insurance Price: ₹${data.predicted_price.toFixed(2)}`);
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-800 to-gray-800 text-white p-6">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 bg-opacity-80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-100 tracking-wide drop-shadow-lg">
          Insurance Price Predictor
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full px-5 py-4 rounded-xl bg-gray-700 bg-opacity-30 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 text-gray-200 outline-none transition-shadow duration-300 shadow-sm focus:shadow-md"
            required
          />
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            placeholder="BMI"
            className="w-full px-5 py-4 rounded-xl bg-gray-700 bg-opacity-30 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 text-gray-200 outline-none transition-shadow duration-300 shadow-sm focus:shadow-md"
            required
          />
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
            placeholder="Number of Children"
            className="w-full px-5 py-4 rounded-xl bg-gray-700 bg-opacity-30 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 text-gray-200 outline-none transition-shadow duration-300 shadow-sm focus:shadow-md"
            required
          />
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-gray-700 bg-opacity-30 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 text-gray-200 outline-none transition-shadow duration-300 shadow-sm focus:shadow-md"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            name="smoker"
            value={formData.smoker}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-gray-700 bg-opacity-30 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 text-gray-200 outline-none transition-shadow duration-300 shadow-sm focus:shadow-md"
          >
            <option value="no">Non-Smoker</option>
            <option value="yes">Smoker</option>
          </select>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-gray-700 bg-opacity-30 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 text-gray-200 outline-none transition-shadow duration-300 shadow-sm focus:shadow-md"
          >
            <option value="northeast">Northeast</option>
            <option value="northwest">Northwest</option>
            <option value="southeast">Southeast</option>
            <option value="southwest">Southwest</option>
          </select>
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Predicting..." : "Get Prediction"}
          </button>
        </form>
        {result && (
          <p className="text-green-300 text-center mt-8 text-xl font-semibold drop-shadow">
            {result}
          </p>
        )}
        {error && (
          <p className="text-red-400 text-center mt-8 text-xl drop-shadow">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}