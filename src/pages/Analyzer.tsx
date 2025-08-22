import React from "react";
import { useState } from "react";
import { ResumeUpload } from "@/components/ResumeUpload";
import AnalysisResults from "@/components/AnalysisResults";
import HomeNavbar from "../components/HomeNavbar";

const Analyzer = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleResumeSubmit = async (resumeText: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-resume-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Analysis failed:', error);
      setSuggestions(['Unable to analyze resume. Please try again.']);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSuggestions([]);
  };

  return (
    <>
      <HomeNavbar />
      <div className="min-h-screen bg-gradient-steam">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Analyzer</h1>
          <p className="mb-6 md:mb-8 text-base md:text-lg text-muted-foreground">Upload your resume to get AI-powered analysis.</p>
          {suggestions.length === 0 ? (
            <ResumeUpload onResumeSubmit={handleResumeSubmit} isAnalyzing={isAnalyzing} />
          ) : (
            <div className="max-w-6xl mx-auto">
              <AnalysisResults suggestions={suggestions} />
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
