const ort = require('onnxruntime-node');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let session;
ort.InferenceSession.create('./models/insurance_model.onnx').then(s => {
  session = s;
  console.log("ONNX model loaded ✅");
});

app.post('/predict', async (req, res) => {
  try {
    const { age, sex, bmi, children, smoker, region, income, policy_term } = req.body;
    
    const sex_female = sex === 'female' ? 1 : 0;
    const sex_male = sex === 'male' ? 1 : 0;
    
    // For smoker (assuming original values were 'yes' and 'no')
    const smoker_no = smoker === 'no' ? 1 : 0;
    const smoker_yes = smoker === 'yes' ? 1 : 0;
    
    // For region (all four possible values)
    const region_northeast = region === 'northeast' ? 1 : 0;
    const region_northwest = region === 'northwest' ? 1 : 0;
    const region_southeast = region === 'southeast' ? 1 : 0;
    const region_southwest = region === 'southwest' ? 1 : 0;

    // Create input array in exactly the same order as during training
    const inputArray = [
      age,
      bmi,
      children,
      // Include all one-hot encoded columns in the same order as in training
      sex_female, 
      sex_male,
      smoker_no,
      smoker_yes,
      region_northeast,
      region_northwest,
      region_southeast,
      region_southwest,
      // Then add custom features that weren't in the original dataset
      income
    ];
    
    console.log("Input data:", inputArray);
    
    const inputTensor = new ort.Tensor(
      'float32',
      Float32Array.from(inputArray),
      [1, inputArray.length]
    );

    const feeds = { 'float_input': inputTensor };
    const results = await session.run(feeds);
    const prediction = results.variable.data[0]*10;

    // tax: 18% of base premium
    const tax = prediction * 0.18;
    const totalWithTax = prediction + tax;
    const yearlyPayment = totalWithTax / policy_term;

    res.json({
      base_premium: prediction.toFixed(2),
      tax: tax.toFixed(2),
      total: totalWithTax.toFixed(2),
      yearly_payment: yearlyPayment.toFixed(2),
    });

  } catch (err) {
    console.error("Prediction error ❌", err);
    console.error("Error details:", err.message);
    res.status(500).json({ 
      error: "Prediction failed", 
      details: err.message
    });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
