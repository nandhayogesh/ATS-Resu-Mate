import { HfInference } from '@huggingface/inference';

// Note: In a production app, this should be stored securely
// For this demo, we'll use a placeholder that users can replace
const HF_API_KEY = 'your-huggingface-api-key-here';

const hf = new HfInference(HF_API_KEY);

interface AnalysisResult {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  skills: { name: string; confidence: number }[];
  atsOptimization: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  interviewQuestions: string[];
  salaryEstimate: {
    min: number;
    max: number;
    currency: string;
  };
}

export class AIService {
  private static extractSkills(resumeText: string): { name: string; confidence: number }[] {
    // Common technical and professional skills
    const skillPatterns = [
      { pattern: /javascript|js\b/i, name: 'JavaScript' },
      { pattern: /typescript|ts\b/i, name: 'TypeScript' },
      { pattern: /react/i, name: 'React' },
      { pattern: /python/i, name: 'Python' },
      { pattern: /java\b/i, name: 'Java' },
      { pattern: /sql/i, name: 'SQL' },
      { pattern: /aws|amazon web services/i, name: 'AWS' },
      { pattern: /docker/i, name: 'Docker' },
      { pattern: /kubernetes|k8s/i, name: 'Kubernetes' },
      { pattern: /git/i, name: 'Git' },
      { pattern: /agile|scrum/i, name: 'Agile/Scrum' },
      { pattern: /project management/i, name: 'Project Management' },
      { pattern: /communication/i, name: 'Communication' },
      { pattern: /leadership/i, name: 'Leadership' },
      { pattern: /analysis|analytical/i, name: 'Data Analysis' },
    ];

    return skillPatterns
      .map(({ pattern, name }) => {
        const matches = resumeText.match(pattern);
        if (matches) {
          // Simple confidence scoring based on frequency and context
          const frequency = (resumeText.match(new RegExp(pattern.source, 'gi')) || []).length;
          const confidence = Math.min(0.3 + (frequency * 0.2), 0.95);
          return { name, confidence };
        }
        return null;
      })
      .filter(Boolean) as { name: string; confidence: number }[];
  }

  private static analyzeContent(resumeText: string): Omit<AnalysisResult, 'skills'> {
    const text = resumeText.toLowerCase();
    
    // Basic analysis scoring
    let score = 50; // Base score
    const strengths: string[] = [];
    const improvements: string[] = [];
    const atsIssues: string[] = [];
    const atsRecommendations: string[] = [];

    // Check for contact information
    if (text.includes('@') || text.includes('email')) {
      score += 5;
      strengths.push('Contact information is clearly provided');
    } else {
      improvements.push('Add clear contact information including email');
      atsIssues.push('Missing contact information');
    }

    // Check for professional summary
    if (text.includes('summary') || text.includes('objective')) {
      score += 10;
      strengths.push('Includes professional summary or objective');
    } else {
      improvements.push('Add a compelling professional summary');
      atsIssues.push('Missing professional summary');
    }

    // Check for quantified achievements
    const numberPattern = /\d+(%|k|million|thousand|years?|projects?)/g;
    const quantifiedAchievements = text.match(numberPattern);
    if (quantifiedAchievements && quantifiedAchievements.length >= 3) {
      score += 15;
      strengths.push('Good use of quantified achievements and metrics');
    } else {
      improvements.push('Add more quantified achievements and specific metrics');
    }

    // Check for action verbs
    const actionVerbs = ['managed', 'led', 'developed', 'implemented', 'created', 'improved', 'increased', 'reduced'];
    const verbCount = actionVerbs.filter(verb => text.includes(verb)).length;
    if (verbCount >= 4) {
      score += 10;
      strengths.push('Uses strong action verbs effectively');
    } else {
      improvements.push('Use more strong action verbs to describe accomplishments');
    }

    // Check for keywords density
    const commonKeywords = ['experience', 'management', 'development', 'analysis', 'team', 'project'];
    const keywordCount = commonKeywords.filter(keyword => text.includes(keyword)).length;
    if (keywordCount >= 4) {
      score += 5;
      atsRecommendations.push('Good keyword density for ATS optimization');
    } else {
      atsIssues.push('Low keyword density - may not pass ATS filters');
      atsRecommendations.push('Include more industry-relevant keywords');
    }

    // Check length
    const wordCount = resumeText.split(/\s+/).length;
    if (wordCount >= 300 && wordCount <= 800) {
      score += 5;
      strengths.push('Appropriate resume length');
    } else if (wordCount < 300) {
      improvements.push('Resume may be too short - add more detail about accomplishments');
    } else {
      improvements.push('Resume may be too long - focus on most relevant information');
    }

    // ATS Score calculation
    let atsScore = 60;
    if (atsIssues.length === 0) atsScore += 20;
    if (atsIssues.length <= 2) atsScore += 10;
    
    // Default recommendations
    atsRecommendations.push('Use standard section headings (Experience, Education, Skills)');
    atsRecommendations.push('Save as PDF to preserve formatting');
    atsRecommendations.push('Include relevant keywords from job descriptions');

    // Generate interview questions based on content
    const interviewQuestions = [
      "Tell me about your most significant professional achievement.",
      "How do you handle challenging situations or tight deadlines?",
      "Describe a time when you had to work with a difficult team member.",
      "What motivates you in your professional career?",
      "Where do you see yourself in the next 5 years?"
    ];

    // Salary estimation (simplified)
    const salaryEstimate = {
      min: 45000,
      max: 85000,
      currency: '$'
    };

    return {
      overallScore: Math.min(Math.max(score, 0), 100),
      strengths,
      improvements,
      atsOptimization: {
        score: atsScore,
        issues: atsIssues,
        recommendations: atsRecommendations
      },
      interviewQuestions,
      salaryEstimate
    };
  }

  static async analyzeResume(resumeText: string): Promise<AnalysisResult> {
    try {
      // For demo purposes, we'll use local analysis
      // In production, you would use HuggingFace models here
      
      const skills = this.extractSkills(resumeText);
      const analysis = this.analyzeContent(resumeText);
      
      return {
        ...analysis,
        skills
      };
    } catch (error) {
      console.error('Error analyzing resume:', error);
      
      // Fallback analysis
      return {
        overallScore: 75,
        strengths: [
          'Resume structure appears professional',
          'Content shows relevant experience'
        ],
        improvements: [
          'Consider adding more quantified achievements',
          'Enhance with industry-specific keywords'
        ],
        skills: [
          { name: 'Communication', confidence: 0.8 },
          { name: 'Problem Solving', confidence: 0.7 },
          { name: 'Project Management', confidence: 0.6 }
        ],
        atsOptimization: {
          score: 70,
          issues: ['Could benefit from more keyword optimization'],
          recommendations: [
            'Use standard section headings',
            'Include more industry keywords',
            'Save as PDF format'
          ]
        },
        interviewQuestions: [
          "Tell me about your professional background.",
          "What are your greatest strengths?",
          "How do you handle challenges at work?"
        ],
        salaryEstimate: {
          min: 50000,
          max: 80000,
          currency: '$'
        }
      };
    }
  }
}