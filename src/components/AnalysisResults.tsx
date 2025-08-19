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
  DollarSign,
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
  salaryEstimate: {
    min: number;
    max: number;
    currency: string;
  };
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
    <div className="space-y-8">
      {/* Overall Score */}
      <Card className="bg-gradient-card border-border/50 shadow-strong">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-medium">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Resume Analysis Score
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6 pb-8">
          <div className={`text-7xl font-bold ${getScoreColor(analysis.overallScore)} drop-shadow-lg`}>
            {analysis.overallScore}/100
          </div>
          <Progress value={analysis.overallScore} className="w-full max-w-md mx-auto h-3 shadow-soft" />
          <Badge variant={getScoreBadgeVariant(analysis.overallScore)} className="text-lg px-6 py-3 shadow-medium">
            {analysis.overallScore >= 80 ? 'Excellent' : 
             analysis.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
          </Badge>
        </CardContent>
      </Card>

      <Tabs defaultValue="feedback" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="ats">ATS Score</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Detected Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(skill.confidence * 100)}%
                      </span>
                    </div>
                    <Progress value={skill.confidence * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ats" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                ATS Optimization Score: {analysis.atsOptimization.score}/100
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={analysis.atsOptimization.score} />
              
              {analysis.atsOptimization.issues.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-red-600">Issues Found:</h4>
                  <ul className="space-y-1">
                    {analysis.atsOptimization.issues.map((issue, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2 text-green-600">Recommendations:</h4>
                <ul className="space-y-1">
                  {analysis.atsOptimization.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interview" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Potential Interview Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.interviewQuestions.map((question, index) => (
                  <Card key={index} className="p-4 bg-accent/50">
                    <p className="text-sm font-medium">{question}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Estimated Salary Range
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {analysis.salaryEstimate.currency}{analysis.salaryEstimate.min.toLocaleString()} - {analysis.salaryEstimate.currency}{analysis.salaryEstimate.max.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on your skills and experience level
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};