import axios from 'axios';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json({ error: 'Missing resumeText' });
  }

  const TEXTRAZOR_API_KEY = 'b9752215b37f0abf0ad509b6fc17fdde2e5f36d070847625e005306a';
  
  try {
    console.log('Analyzing resume text with TextRazor...');
    
    // Enhanced TextRazor API call with more extractors
    const response = await axios.post('https://api.textrazor.com/',
      `text=${encodeURIComponent(resumeText)}&extractors=entities,topics,keywords,sentiment,phrases&classifiers=textrazor_newscodes&languageOverride=eng`,
      {
        headers: {
          'x-textrazor-key': TEXTRAZOR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    const textRazorData = response.data.response;
    
    // Extract comprehensive data from TextRazor response
    const entities = textRazorData.entities || [];
    const topics = textRazorData.topics || [];
    const keywords = textRazorData.keywords || [];
    const sentiment = textRazorData.sentiment || [];
    
    // Generate intelligent suggestions based on AI analysis
    const suggestions = generateIntelligentSuggestions(resumeText, {
      entities,
      topics,
      keywords,
      sentiment
    });
    
    console.log('Analysis completed, returning AI-powered suggestions');
    res.json({ suggestions });
  } catch (error) {
    console.error('TextRazor API error:', error);
    
    // Fallback to basic analysis if TextRazor fails
    const fallbackSuggestions = generateFallbackSuggestions(resumeText);
    res.json({ suggestions: fallbackSuggestions });
  }
}

function generateIntelligentSuggestions(resumeText, aiData) {
  const suggestions = [];
  const text = resumeText.toLowerCase();
  const { entities, topics, keywords, sentiment } = aiData;
  
  // 1. Technical Skills Analysis
  const techEntities = entities.filter(entity => 
    entity.type && (
      entity.type.includes('Technology') ||
      entity.type.includes('Product') ||
      entity.type.includes('ProgrammingLanguage')
    )
  );
  
  if (techEntities.length < 5) {
    const suggestedSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker'];
    suggestions.push(`Add more technical skills relevant to your field. Consider including: ${suggestedSkills.slice(0, 3).join(', ')}`);
  }
  
  // 2. Professional Experience Analysis
  const orgEntities = entities.filter(entity => 
    entity.type && entity.type.includes('Organization')
  );
  
  if (orgEntities.length < 2) {
    suggestions.push('Include more specific company names and organizations to strengthen your professional background');
  }
  
  // 3. Achievement Quantification
  const numberPattern = /\d+[\d,]*(\.\d+)?[%]?/g;
  const numbers = resumeText.match(numberPattern) || [];
  
  if (numbers.length < 3) {
    suggestions.push('Add more quantified achievements (e.g., "Increased sales by 25%", "Managed team of 10 people", "Reduced costs by $50K")');
  }
  
  // 4. Topic Relevance Analysis
  const professionalTopics = topics.filter(topic => topic.score > 0.5);
  
  if (professionalTopics.length < 3) {
    suggestions.push('Include more industry-specific terminology and concepts to improve relevance for ATS systems');
  } else {
    const topTopic = professionalTopics[0];
    if (topTopic.label.includes('Technology')) {
      suggestions.push('For tech roles: Add specific frameworks, methodologies (Agile, DevOps), and certifications');
    } else if (topTopic.label.includes('Business')) {
      suggestions.push('For business roles: Emphasize leadership, strategy, and business impact metrics');
    }
  }
  
  // 5. Keyword Density and Variety
  const uniqueKeywords = new Set(keywords.map(k => k.token.toLowerCase())).size;
  const totalWords = resumeText.split(/\s+/).length;
  
  if (uniqueKeywords / totalWords < 0.4) {
    suggestions.push('Improve keyword variety to avoid repetition and enhance ATS compatibility');
  }
  
  // 6. Sentiment Analysis
  if (sentiment.length > 0) {
    const avgSentiment = sentiment.reduce((acc, s) => acc + s.score, 0) / sentiment.length;
    if (avgSentiment < 0.1) {
      suggestions.push('Use more positive and confident language to better showcase your achievements');
    }
  }
  
  // 7. Action Verbs Analysis
  const actionVerbs = ['developed', 'implemented', 'managed', 'created', 'improved', 'optimized', 'achieved', 'collaborated'];
  const foundActionVerbs = actionVerbs.filter(verb => text.includes(verb));
  
  if (foundActionVerbs.length < 4) {
    suggestions.push(`Start bullet points with strong action verbs: ${actionVerbs.slice(0, 4).join(', ')}`);
  }
  
  // 8. Professional Structure Analysis
  if (!text.includes('summary') && !text.includes('objective')) {
    suggestions.push('Add a professional summary (3-4 sentences) highlighting your key qualifications');
  }
  
  if (!text.includes('education')) {
    suggestions.push('Include an education section with relevant degrees and certifications');
  }
  
  // 9. Contact Information
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phonePattern = /[\+]?[1-9]?[\-\.\s]?\(?[0-9]{3}\)?[\-\.\s]?[0-9]{3}[\-\.\s]?[0-9]{4}/;
  
  if (!emailPattern.test(resumeText)) {
    suggestions.push('Ensure your email address is clearly visible in the contact section');
  }
  
  if (!phonePattern.test(resumeText)) {
    suggestions.push('Include your phone number in a professional format');
  }
  
  // 10. Industry-Specific Recommendations based on AI analysis
  const detectedIndustry = getIndustryFromTopics(topics);
  if (detectedIndustry) {
    suggestions.push(`For ${detectedIndustry} industry: Focus on relevant certifications and industry-specific achievements`);
  }
  
  return suggestions.slice(0, 10); // Return top 10 suggestions
}

function getIndustryFromTopics(topics) {
  const industryKeywords = {
    'Technology': ['software', 'programming', 'development', 'IT'],
    'Healthcare': ['medical', 'healthcare', 'clinical', 'patient'],
    'Finance': ['financial', 'banking', 'investment', 'accounting'],
    'Marketing': ['marketing', 'advertising', 'brand', 'digital'],
    'Education': ['education', 'teaching', 'academic', 'research']
  };
  
  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    if (topics.some(topic => 
      keywords.some(keyword => topic.label.toLowerCase().includes(keyword))
    )) {
      return industry;
    }
  }
  
  return null;
}

function generateFallbackSuggestions(resumeText) {
  const suggestions = [
    'Add more quantified achievements with specific numbers and percentages',
    'Include relevant keywords from your target job descriptions',
    'Use strong action verbs to start each bullet point',
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
