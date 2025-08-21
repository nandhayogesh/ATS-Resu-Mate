import { useState } from 'react';
import { ResumeUpload } from '@/components/ResumeUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AIService } from '@/services/aiService';
import HomeNavbar from "../components/HomeNavbar";
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
    <>
      <HomeNavbar analysis={analysis} resetAnalysis={resetAnalysis} />
      <div className="min-h-screen bg-gradient-steam">
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
                    Receive comprehensive AI-powered analysis to optimize for ATS systems and land your dream job.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-3 gap-8 mt-16">
                  <div className="text-center p-8 rounded-xl bg-gradient-card border border-border/50 shadow-medium transition-all duration-500 group">
                    <div className="flex items-center justify-center mx-auto mb-6 w-20 h-20 bg-white rounded-xl shadow-medium transition-all duration-300 overflow-hidden">
                      <img src="/ats-optimization.png" alt="ATS Optimization" className="w-28 h-28 object-cover scale-125" style={{objectPosition: 'center'}} />
                    </div>
                    <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">ATS Optimization</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ensure your resume passes Applicant Tracking Systems
                    </p>
                  </div>
                  <div className="text-center p-8 rounded-xl bg-gradient-card border border-border/50 shadow-medium transition-all duration-500 group">
                    <div className="flex items-center justify-center mx-auto mb-6 w-20 h-20 bg-white rounded-xl shadow-medium transition-all duration-300 overflow-hidden">
                      <img src="/ai-powered-analysis.png" alt="AI-Powered Analysis" className="w-28 h-28 object-cover scale-125" style={{objectPosition: 'center'}} />
                    </div>
                    <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">AI-Powered Analysis</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Advanced algorithms analyze content and structure
                    </p>
                  </div>
                  <div className="text-center p-8 rounded-xl bg-gradient-card border border-border/50 shadow-medium transition-all duration-500 group">
                    <div className="flex items-center justify-center mx-auto mb-6 w-20 h-20 bg-white rounded-xl shadow-medium transition-all duration-300 overflow-hidden">
                      <img src="/professional-insights.png" alt="Professional Insights" className="w-28 h-28 object-cover scale-125" style={{objectPosition: 'center'}} />
                    </div>
                    <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">Professional Insights</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Get interview questions and salary estimates
                    </p>
                  </div>
                </div>
              </div>
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
            <p>© 2024 ATS Resu-Mate. Enhance your career with intelligent resume analysis.</p>
            <div className="mt-2 text-xs text-muted-foreground/60">
              Powered by Steam-inspired design & Advanced AI Technology
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
