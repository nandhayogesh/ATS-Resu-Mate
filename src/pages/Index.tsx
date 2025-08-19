import { useState } from 'react';
import { ResumeUpload } from '@/components/ResumeUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AIService } from '@/services/aiService';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target, Shield } from 'lucide-react';

interface AnalysisData {
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

const Index = () => {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleResumeSubmit = async (resumeText: string) => {
    setIsAnalyzing(true);
    try {
      const result = await AIService.analyzeResume(resumeText);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Resume Reviewer</h1>
                <p className="text-sm text-muted-foreground">Powered by Advanced AI Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                <Zap className="h-3 w-3 mr-1" />
                Free Analysis
              </Badge>
              {analysis && (
                <button
                  onClick={resetAnalysis}
                  className="text-sm text-primary hover:underline"
                >
                  New Analysis
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!analysis ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 mb-12">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Get Professional Resume Insights
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Upload your resume and receive comprehensive AI-powered analysis to optimize for ATS systems and land your dream job.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 rounded-lg bg-card shadow-soft">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">ATS Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensure your resume passes Applicant Tracking Systems
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-card shadow-soft">
                  <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced algorithms analyze content and structure
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-card shadow-soft">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Professional Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Get interview questions and salary estimates
                  </p>
                </div>
              </div>
            </div>

            <ResumeUpload
              onResumeSubmit={handleResumeSubmit}
              isAnalyzing={isAnalyzing}
            />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <AnalysisResults analysis={analysis} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 AI Resume Reviewer. Enhance your career with intelligent resume analysis.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
