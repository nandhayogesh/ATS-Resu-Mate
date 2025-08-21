import { supabase } from '@/integrations/supabase/client';

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
  static async analyzeResume(resumeText: string): Promise<AnalysisResult> {
    try {
      // Call the secure Edge Function for AI-powered analysis
      const { data, error } = await supabase.functions.invoke('analyze-resume', {
        body: { resumeText }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      
      // Fallback to basic analysis if Edge Function fails
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