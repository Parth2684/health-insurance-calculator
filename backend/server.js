const express = require("express");
const cors = require("cors");
const ort = require("onnxruntime-node");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Load ONNX model
let session;
async function loadModel() {
  const modelPath = path.join(__dirname, "models", "insurance_model.onnx");
  session = await ort.InferenceSession.create(modelPath);
  console.log("✅ Model loaded successfully!");
}
loadModel().catch(console.error);

// Function to preprocess input
function preprocessInput({ age, bmi, children, sex, smoker, region }) {
  // One-hot encoding for sex
  const sex_male = sex === "male" ? 1 : 0;
  const sex_female = sex === "female" ? 1 : 0;

  // One-hot encoding for smoker
  const smoker_yes = smoker === "yes" ? 1 : 0;
  const smoker_no = smoker === "no" ? 1 : 0;

  // One-hot encoding for region
  const region_southwest = region === "southwest" ? 1 : 0;
  const region_southeast = region === "southeast" ? 1 : 0;
  const region_northwest = region === "northwest" ? 1 : 0;
  const region_northeast = region === "northeast" ? 1 : 0;

  return [
    age, bmi, children, 
    sex_male, sex_female,
    smoker_yes, smoker_no,
    region_southwest, region_southeast, region_northwest, region_northeast
  ];
}

// Predict API
app.post("/predict", async (req, res) => {
  try {
    if (!session) return res.status(500).json({ error: "Model not loaded yet!" });

    const { age, bmi, children, sex, smoker, region } = req.body;

    // One-hot encoding for categorical values
    const sexEncoded = sex === "male" ? [1, 0] : [0, 1];
    const smokerEncoded = smoker === "yes" ? [1, 0] : [0, 1];
    const regions = ["northeast", "northwest", "southeast", "southwest"];
    const regionEncoded = regions.map((r) => (r === region ? 1 : 0));

    // Ensure input shape is [1, 11]
    const inputArray = [age, bmi, children, ...sexEncoded, ...smokerEncoded, ...regionEncoded];
    const inputTensor = new ort.Tensor("float32", new Float32Array(inputArray), [1, 11]);

    // Run inference
    const results = await session.run({ float_input: inputTensor });

    console.log("Inference Results:", results);

    // Extract output correctly
    const outputKey = Object.keys(results)[0]; // Get output key dynamically
    const predictedPrice = results[outputKey]?.data[0];

    if (predictedPrice === undefined) {
      throw new Error("Invalid model output");
    }

    res.json({ predicted_price: predictedPrice });
  } catch (error) {
    console.error("❌ Prediction error:", error);
    res.status(500).json({ error: "Error making prediction" });
  }
});


// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));