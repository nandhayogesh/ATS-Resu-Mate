const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyBUBd3LBfUnJcXcArpV370Zgt9yuG0zUx8";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

app.post('/api/analyze-resume', async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ error: 'Missing resumeText' });

  const prompt = `Suggest improvements for this resume: ${resumeText}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.json({ suggestions: text.split('\n').filter(Boolean) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Gemini proxy server running on port ${PORT}`);
});
