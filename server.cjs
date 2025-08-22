const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// TextRazor API endpoint
app.post('/api/analyze-resume-text', async (req, res) => {
  try {
    const { resumeText } = req.body;
    
    if (!resumeText) {
      return res.status(400).json({ error: 'Missing resumeText' });
    }

    const TEXTRAZOR_API_KEY = 'b9752215b37f0abf0ad509b6fc17fdde2e5f36d070847625e005306a';
    
    console.log('🔍 Analyzing resume text with TextRazor...');
    console.log('📊 API Key length:', TEXTRAZOR_API_KEY.length);
    console.log('📝 Resume text length:', resumeText.length);
    
    // Enhanced TextRazor API call
    const response = await axios.post('https://api.textrazor.com/',
      `text=${encodeURIComponent(resumeText)}&extractors=entities,topics,keywords&languageOverride=eng`,
      {
        headers: {
          'x-textrazor-key': TEXTRAZOR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000 // 10 second timeout
      }
    );
    
    console.log('✅ TextRazor response status:', response.status);
    console.log('📋 TextRazor response keys:', Object.keys(response.data));
    
    const textRazorData = response.data.response || {};
    
    // Extract comprehensive data from TextRazor response
    const entities = textRazorData.entities || [];
    const topics = textRazorData.topics || [];
    const keywords = textRazorData.keywords || [];
    
    console.log('🎯 Entities found:', entities.length);
    console.log('📚 Topics found:', topics.length);
    console.log('🔤 Keywords found:', keywords.length);
    
    // Generate intelligent suggestions based on AI analysis
    const suggestions = generateIntelligentSuggestions(resumeText, {
      entities,
      topics,
      keywords
    });
    
    console.log('💡 Generated suggestions:', suggestions.length);
    res.json({ suggestions });
    
  } catch (error) {
    console.error('❌ TextRazor API error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText
    });
    
    // Fallback to basic analysis if TextRazor fails
    const fallbackSuggestions = generateFallbackSuggestions(req.body.resumeText);
    console.log('🔄 Using fallback suggestions due to API error');
    res.json({ suggestions: fallbackSuggestions });
  }
});

function generateIntelligentSuggestions(resumeText, aiData) {
  const suggestions = [];
  const text = resumeText.toLowerCase();
  const { entities, topics, keywords } = aiData;
  
  console.log('🧠 Generating intelligent suggestions...');
  
  // 1. Technical Skills Analysis from entities
  const techEntities = entities.filter(entity => 
    entity.type && (
      entity.type.includes('Technology') ||
      entity.type.includes('Product') ||
      entity.type.includes('Software')
    )
  );
  
  console.log('💻 Tech entities found:', techEntities.map(e => e.entityId));
  
  // 2. Check for specific technologies mentioned
  const technologies = ['javascript', 'python', 'react', 'node', 'java', 'sql', 'aws', 'docker'];
  const foundTech = technologies.filter(tech => text.includes(tech));
  
  if (foundTech.length > 0) {
    suggestions.push(`Great! I see you have experience with ${foundTech.join(', ')}. Consider adding specific projects or achievements using these technologies.`);
  }
  
  // 3. Company analysis from entities
  const companies = entities.filter(entity => 
    entity.type && entity.type.includes('Organization')
  ).map(e => e.entityId);
  
  if (companies.length > 0) {
    suggestions.push(`Excellent work history with ${companies.slice(0,2).join(' and ')}. Highlight specific achievements and impact at these companies.`);
  }
  
  // 4. Numbers and achievements
  const numberPattern = /\d+[\d,]*(\.\d+)?[%]?/g;
  const numbers = resumeText.match(numberPattern) || [];
  
  if (numbers.length > 0) {
    suggestions.push(`Good use of metrics! I found ${numbers.length} quantified achievements. Consider adding more specific percentages and dollar amounts.`);
  } else {
    suggestions.push('Add quantified achievements with specific numbers (e.g., "Increased sales by 25%", "Managed team of 10")');
  }
  
  // 5. Topic-based suggestions
  const topTopics = topics.slice(0, 3).map(t => t.label);
  if (topTopics.length > 0) {
    suggestions.push(`Your resume focuses on ${topTopics.join(', ')}. Make sure to include relevant keywords for these areas.`);
  }
  
  // 6. Keyword density analysis
  if (keywords.length > 0) {
    const topKeywords = keywords.slice(0, 5).map(k => k.token);
    suggestions.push(`Key terms detected: ${topKeywords.join(', ')}. Consider using these terms strategically throughout your resume.`);
  }
  
  // 7. General improvements based on content analysis
  if (!text.includes('summary') && !text.includes('objective')) {
    suggestions.push('Add a professional summary section at the top of your resume (3-4 sentences highlighting your key qualifications)');
  }
  
  if (!text.includes('education')) {
    suggestions.push('Include an education section with relevant degrees, certifications, and coursework');
  }
  
  // 8. Industry-specific advice based on detected topics
  if (topics.some(t => t.label.toLowerCase().includes('technology') || t.label.toLowerCase().includes('software'))) {
    suggestions.push('For tech roles: Include GitHub portfolio, technical certifications, and specific frameworks/methodologies');
  }
  
  if (topics.some(t => t.label.toLowerCase().includes('business') || t.label.toLowerCase().includes('management'))) {
    suggestions.push('For business roles: Emphasize leadership experience, team management, and business impact metrics');
  }
  
  return suggestions.slice(0, 8); // Return top 8 suggestions
}

function generateFallbackSuggestions(resumeText) {
  console.log('🔄 Generating fallback suggestions...');
  
  const suggestions = [
    'Add more quantified achievements with specific numbers and percentages',
    'Include relevant keywords from your target job descriptions',
    'Use strong action verbs to start each bullet point (developed, implemented, managed)',
    'Add a professional summary highlighting your key qualifications',
    'Include technical skills and certifications relevant to your field',
    'Ensure consistent formatting throughout the document',
    'Add specific company names and project details',
    'Include education and relevant coursework',
    'Use industry-specific terminology and acronyms',
    'Optimize for ATS by using standard section headings'
  ];
  
  return suggestions;
}

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📡 TextRazor endpoint: http://localhost:${PORT}/api/analyze-resume-text`);
});

module.exports = app;
