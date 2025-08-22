import React from "react";
import { useState } from "react";
import { ResumeUpload } from "@/components/ResumeUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import HomeNavbar from "../components/HomeNavbar";
import { AIService } from "@/services/aiService";

const Analyzer = () => {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleResumeSubmit = async (resumeText: string) => {
    setIsAnalyzing(true);
    try {
      const result = await AIService.analyzeResume(resumeText);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis({ 
        overallScore: 0,
        strengths: [],
        improvements: ['Analysis failed. Please try again.'],
        skills: [],
        atsOptimization: { score: 0, issues: [], recommendations: [] },
        interviewQuestions: [],
        salaryEstimate: { min: 0, max: 0, currency: '$' }
      });
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
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Analyzer</h1>
        <p className="mb-6 md:mb-8 text-base md:text-lg text-muted-foreground">Upload your resume to get AI-powered analysis.</p>
        {!analysis ? (
          <ResumeUpload onResumeSubmit={handleResumeSubmit} isAnalyzing={isAnalyzing} />
        ) : (
          <div className="max-w-6xl mx-auto">
            <AnalysisResults analysis={analysis} />
            <div className="text-center mt-6 md:mt-8">
              <button onClick={resetAnalysis} className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200">New Analysis</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Analyzer;
