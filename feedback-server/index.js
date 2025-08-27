const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { CohereClient } = require("cohere-ai");

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


async function getFeedbackFromLLM(code, lang = "cpp") {
  const response = await cohere.chat({
    model: "command-r-plus",
    message: `Review the following ${lang} code. 
      1. Check syntax issues.
      2. Suggest readability improvements.
      3. Suggest NeetCode-style refactor.

      Code:
      ${code}`
  });

  return response.text;
}


app.post("/feedback", async (req, res) => {
  const { code, lang = "cpp" } = req.body;

  if (!code || code.length === 0) {
    return res.status(400).json({ success: false, message: "Empty code" });
  }

  try {
    const response = await cohere.chat({
      model: "command-r-plus",
      message: `Review the following ${lang} code. 
        1. Check syntax issues.
        2. Suggest readability improvements.
        3. Suggest NeetCode-style refactor.
        4. Space Complexity.
        5. Time Complexity
        
        Code:
        ${code}`
    });

    res.status(200).json({
      success: true,
      feedback: response.text,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/analyze", async (req, res) => {
  const { code, lang = "cpp" } = req.body;

  if (!code || code.length === 0) {
    return res.status(400).json({ success: false, message: "Empty code" });
  }

  try {
    const feedback = await getFeedbackFromLLM(code, lang);
    res.json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Feedback service running on ${PORT}`));
