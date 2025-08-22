const express = require('express');
const cors = require('cors');
const Tesseract = require('tesseract.js');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// POST /api/ocr-resume-image: Accepts image upload, returns extracted text
app.post('/api/ocr-resume-image', upload.single('resumeImage'), async (req, res) => {
  console.log('OCR request received');
  if (!req.file) {
    console.log('No file uploaded');
    return res.status(400).json({ error: 'No image uploaded' });
  }
  try {
    console.log('Processing file:', req.file.path);
    const { path } = req.file;
    const result = await Tesseract.recognize(path, 'eng', {
      logger: m => console.log(m)
    });
    fs.unlinkSync(path); // Clean up uploaded file
    console.log('OCR completed, text length:', result.data.text.length);
    res.json({ text: result.data.text });
  } catch (error) {
    console.error('OCR error:', error);
    res.status(500).json({ error: error.message });
  }
});
// POST /api/analyze-resume-text: Accepts resume text, returns improvement suggestions using TextRazor
app.post('/api/analyze-resume-text', async (req, res) => {
	const { resumeText } = req.body;
	if (!resumeText) return res.status(400).json({ error: 'Missing resumeText' });

	const TEXTRAZOR_API_KEY = 'b9752215b37f0abf0ad509b6fc17fdde2e5f36d070847625e005306a';
	try {
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
		// Simple suggestion logic: combine entities, topics, and words
		const suggestions = [...new Set([...entities, ...topics, ...words])].filter(Boolean);
		res.json({ suggestions });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Resume OCR & analysis server running on port ${PORT}`);
});
