import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CheckCircle } from 'lucide-react';

interface AnalysisResultsProps {
  suggestions: string[];
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No suggestions available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            AI-Powered Suggestions
          </CardTitle>
          <CardDescription>
            Personalized recommendations to improve your resume based on AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white/60 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
