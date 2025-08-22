import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Star,
  Briefcase,
  MessageSquare
} from 'lucide-react';

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
}

interface AnalysisResultsProps {
  analysis: AnalysisData;
}

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Overall Score */}
      <Card className="bg-gradient-card border-border/50 shadow-strong">
        <CardHeader className="text-center pb-3 md:pb-4 px-4 md:px-6">
          <CardTitle className="flex items-center justify-center gap-2 md:gap-3 text-lg md:text-2xl">
            <div className="p-1.5 md:p-2 bg-gradient-primary rounded-lg shadow-medium">
              <Target className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Resume Analysis Score
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4 md:space-y-6 pb-6 md:pb-8 px-4 md:px-6">
          <div className={`text-4xl md:text-7xl font-bold ${getScoreColor(analysis.overallScore)} drop-shadow-lg`}>
            {analysis.overallScore}/100
          </div>
          <Progress value={analysis.overallScore} className="w-full max-w-md mx-auto h-2 md:h-3 shadow-soft" />
          <Badge variant={getScoreBadgeVariant(analysis.overallScore)} className="text-sm md:text-lg px-4 md:px-6 py-2 md:py-3 shadow-medium">
            {analysis.overallScore >= 80 ? 'Excellent' : 
             analysis.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
          </Badge>
        </CardContent>
      </Card>

      <Tabs defaultValue="feedback" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="feedback" className="text-xs md:text-sm py-2 md:py-3">Feedback</TabsTrigger>
          <TabsTrigger value="skills" className="text-xs md:text-sm py-2 md:py-3">Skills</TabsTrigger>
          <TabsTrigger value="ats" className="text-xs md:text-sm py-2 md:py-3">ATS Score</TabsTrigger>
          <TabsTrigger value="interview" className="text-xs md:text-sm py-2 md:py-3">Interview</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <Card className="shadow-soft">
              <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
                <CardTitle className="flex items-center gap-2 text-green-600 text-base md:text-lg">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <ul className="space-y-1.5 md:space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
                <CardTitle className="flex items-center gap-2 text-orange-600 text-base md:text-lg">
                  <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <ul className="space-y-1.5 md:space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          <Card className="shadow-soft">
            <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Briefcase className="h-4 w-4 md:h-5 md:w-5" />
                Detected Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <div className="space-y-2 md:space-y-3">
                {analysis.skills.map((skill, index) => (
                  <div key={index} className="space-y-1 md:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm md:text-base">{skill.name}</span>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {Math.round(skill.confidence * 100)}%
                      </span>
                    </div>
                    <Progress value={skill.confidence * 100} className="h-1.5 md:h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ats" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          <Card className="shadow-soft">
            <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Target className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-sm md:text-base">ATS Score: {analysis.atsOptimization.score}/100</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 px-4 md:px-6">
              <Progress value={analysis.atsOptimization.score} className="h-2" />
              
              {analysis.atsOptimization.issues.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-red-600 text-sm md:text-base">Issues Found:</h4>
                  <ul className="space-y-1">
                    {analysis.atsOptimization.issues.map((issue, index) => (
                      <li key={index} className="text-xs md:text-sm flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2 text-green-600 text-sm md:text-base">Recommendations:</h4>
                <ul className="space-y-1">
                  {analysis.atsOptimization.recommendations.map((rec, index) => (
                    <li key={index} className="text-xs md:text-sm flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interview" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          <Card className="shadow-soft">
            <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
                Potential Interview Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <div className="space-y-2 md:space-y-3">
                {analysis.interviewQuestions.map((question, index) => (
                  <Card key={index} className="p-3 md:p-4 bg-accent/50">
                    <p className="text-xs md:text-sm font-medium">{question}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};