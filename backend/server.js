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
    const smoker_no = smoker === 'no' ? 1 : 0;
    const smoker_yes = smoker === 'yes' ? 1 : 0;
    const region_northeast = region === 'northeast' ? 1 : 0;
    const region_northwest = region === 'northwest' ? 1 : 0;
    const region_southeast = region === 'southeast' ? 1 : 0;
    const region_southwest = region === 'southwest' ? 1 : 0;

    const inputArray = [
      age,
      bmi,
      children,
      sex_female, 
      sex_male,
      smoker_no,
      smoker_yes,
      region_northeast,
      region_northwest,
      region_southeast,
      region_southwest,
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

    const tax = prediction * 0.18;
    const totalWithTax = prediction + tax;
    const yearlyPayment = totalWithTax / policy_term;

    // 🔥 Claimable Amount Logic
    let riskMultiplier = 1;

    if (smoker === 'yes') riskMultiplier += 0.3;
    if (age >= 45) riskMultiplier += 0.25;
    else if (age >= 30) riskMultiplier += 0.1;
    if (bmi < 18.5 || bmi > 30) riskMultiplier += 0.2;
    if (children >= 3) riskMultiplier += 0.15;
    if (policy_term >= 10) riskMultiplier += 0.1;
    if (income > 1000000) riskMultiplier += 0.15;

    const claimableAmount = Math.min(totalWithTax * 0.8 * riskMultiplier, totalWithTax);

    res.json({
      base_premium: prediction.toFixed(2),
      tax: tax.toFixed(2),
      total: totalWithTax.toFixed(2),
      yearly_payment: yearlyPayment.toFixed(2),
      claimable_amount: claimableAmount.toFixed(2)
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
