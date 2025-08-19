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
    <div className="min-h-screen bg-gradient-steam">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-medium">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-medium">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">AI Resume Reviewer</h1>
                <p className="text-sm text-muted-foreground">Powered by Advanced AI Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="hidden sm:flex bg-gradient-card border-primary/20 shadow-soft">
                <Zap className="h-3 w-3 mr-1 text-primary" />
                Free Analysis
              </Badge>
              {analysis && (
                <button
                  onClick={resetAnalysis}
                  className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
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
            <div className="text-center space-y-8 mb-16">
              <div className="space-y-6">
                <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Get Professional Resume Insights
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Upload your resume and receive comprehensive AI-powered analysis to optimize for ATS systems and land your dream job.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-3 gap-8 mt-16">
                <div className="text-center p-8 rounded-xl bg-gradient-card border border-border/50 shadow-medium hover:shadow-glow hover:border-primary/30 transition-all duration-500 group">
                  <div className="p-4 bg-gradient-primary rounded-xl mx-auto mb-6 w-fit shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">ATS Optimization</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ensure your resume passes Applicant Tracking Systems
                  </p>
                </div>
                <div className="text-center p-8 rounded-xl bg-gradient-card border border-border/50 shadow-medium hover:shadow-glow hover:border-primary/30 transition-all duration-500 group">
                  <div className="p-4 bg-gradient-primary rounded-xl mx-auto mb-6 w-fit shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <Brain className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Advanced algorithms analyze content and structure
                  </p>
                </div>
                <div className="text-center p-8 rounded-xl bg-gradient-card border border-border/50 shadow-medium hover:shadow-glow hover:border-primary/30 transition-all duration-500 group">
                  <div className="p-4 bg-gradient-primary rounded-xl mx-auto mb-6 w-fit shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">Professional Insights</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
      <footer className="border-t border-border/30 bg-card/30 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 AI Resume Reviewer. Enhance your career with intelligent resume analysis.</p>
          <div className="mt-2 text-xs text-muted-foreground/60">
            Powered by Steam-inspired design & Advanced AI Technology
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
