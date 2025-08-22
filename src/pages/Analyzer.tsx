import React from "react";
import { useState } from "react";
import { ResumeUpload } from "@/components/ResumeUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import HomeNavbar from "../components/HomeNavbar";
import { AIService } from "@/services/aiService";

const Analyzer = () => {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleResumeSubmit = async (suggestions: string[]) => {
    setIsAnalyzing(true);
    try {
      setAnalysis({ improvements: suggestions });
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis({ improvements: ['Analysis failed. Please try again.'] });
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Analyzer</h1>
        <p className="mb-8 text-lg text-muted-foreground">Upload your resume to get AI-powered analysis.</p>
        {!analysis ? (
          <ResumeUpload onResumeSubmit={handleResumeSubmit} isAnalyzing={isAnalyzing} />
        ) : (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Improvement Suggestions</h2>
            <ul className="list-disc pl-6 text-lg">
              {analysis.improvements.map((suggestion: string, idx: number) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
            <button onClick={resetAnalysis} className="mt-6 text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200">New Analysis</button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Analyzer;
