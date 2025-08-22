const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/analyze-resume-text: Accepts resume text, returns improvement suggestions using TextRazor
app.post('/api/analyze-resume-text', async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ error: 'Missing resumeText' });

  const TEXTRAZOR_API_KEY = 'b9752215b37f0abf0ad509b6fc17fdde2e5f36d070847625e005306a';
  try {
    console.log('Analyzing resume text with TextRazor...');
    const response = await axios.post('https://api.textrazor.com/',
      `text=${encodeURIComponent(resumeText)}&extractors=entities,topics,words`,
      {
        headers: {
          'x-textrazor-key': TEXTRAZOR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    // Extract improvement suggestions from TextRazor response
    const entities = response.data.response.entities?.map(e => e.entityId) || [];
    const topics = response.data.response.topics?.map(t => t.label) || [];
    const words = response.data.response.words?.map(w => w.lemma) || [];
    
    // Create meaningful suggestions based on analysis
    const suggestions = [
      ...entities.slice(0, 5).map(e => `Consider highlighting your experience with ${e}`),
      ...topics.slice(0, 3).map(t => `Add more details about ${t} in your resume`),
      `Include quantifiable achievements and metrics`,
      `Use action verbs to describe your accomplishments`,
      `Ensure your contact information is clearly visible`
    ];
    
    console.log('Analysis completed, returning suggestions');
    res.json({ suggestions: suggestions.slice(0, 10) }); // Limit to 10 suggestions
  } catch (error) {
    console.error('TextRazor API error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Resume analysis server running on port ${PORT}`);
});
