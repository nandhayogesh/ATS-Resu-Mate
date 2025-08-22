import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResumeUpload } from '@/components/ResumeUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AIService } from '@/services/aiService';
import HomeNavbar from "../components/HomeNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  FileText, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Award,
  Brain,
  Search,
  Upload,
  BarChart3,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";

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

  const stats = [
    { label: "Success Rate", value: "94%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Average Score Boost", value: "+32%", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Analysis Time", value: "<30s", icon: <Clock className="h-5 w-5" /> }
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "ATS Optimization",
      description: "Pass through 95% of Applicant Tracking Systems",
      highlight: "95% Pass Rate"
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced TextRazor technology for deep content analysis",
      highlight: "Enterprise AI"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Smart Insights",
      description: "Personalized recommendations for maximum impact",
      highlight: "Personalized"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your data is never stored, completely confidential",
      highlight: "100% Secure"
    }
  ];

  return (
    <>
      <HomeNavbar analysis={analysis} resetAnalysis={resetAnalysis} />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <main className="container mx-auto px-4">
          {!analysis ? (
            <>
              {/* Hero Section */}
              <section className="py-20 text-center">
                <div className="max-w-5xl mx-auto space-y-8">
                  <div className="space-y-6">
                    <Badge variant="secondary" className="px-4 py-2 text-sm">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Powered by Advanced AI Technology
                    </Badge>
                    
                    <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent leading-tight">
                      Transform Your Resume Into a 
                      <span className="block mt-2">Job-Winning Tool</span>
                    </h1>
                    
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                      Get instant AI-powered analysis, ATS optimization, and professional insights 
                      that help you land more interviews and advance your career.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Link to="/analyzer">
                      <Button 
                        size="lg" 
                        className="px-8 py-6 text-lg font-semibold"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Analyze My Resume Free
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="flex items-center justify-center mb-2 text-primary">
                            {stat.icon}
                          </div>
                          <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Benefits Section */}
              <section className="py-20">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-6">Key Features & Benefits</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                      Discover the powerful features that make our AI-powered resume optimization stand out
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                      <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none shadow-md">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                              {benefit.icon}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {benefit.highlight}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">
                            {benefit.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>

              {/* Features Grid */}
              <section className="py-20 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-6">Complete Resume Analysis Suite</h2>
                    <p className="text-xl text-muted-foreground">
                      Everything you need to create a resume that gets results
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-8">
                    <div className="text-center p-8 rounded-xl bg-card border border-border/50 shadow-medium transition-all duration-500 group hover:shadow-xl">
                      <div className="flex items-center justify-center mx-auto mb-6 w-20 h-20 bg-white rounded-xl shadow-medium transition-all duration-300 overflow-hidden">
                        <img src="/ats-optimization.png" alt="ATS Optimization" className="w-28 h-28 object-cover scale-125" style={{objectPosition: 'center'}} />
                      </div>
                      <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">ATS Optimization</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Ensure your resume passes Applicant Tracking Systems with keyword optimization and formatting best practices
                      </p>
                    </div>
                    
                    <div className="text-center p-8 rounded-xl bg-card border border-border/50 shadow-medium transition-all duration-500 group hover:shadow-xl">
                      <div className="flex items-center justify-center mx-auto mb-6 w-20 h-20 bg-white rounded-xl shadow-medium transition-all duration-300 overflow-hidden">
                        <img src="/ai-powered-analysis.png" alt="AI-Powered Analysis" className="w-28 h-28 object-cover scale-125" style={{objectPosition: 'center'}} />
                      </div>
                      <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">AI-Powered Analysis</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Advanced TextRazor algorithms analyze content structure, grammar, and professional language usage
                      </p>
                    </div>
                    
                    <div className="text-center p-8 rounded-xl bg-card border border-border/50 shadow-medium transition-all duration-500 group hover:shadow-xl">
                      <div className="flex items-center justify-center mx-auto mb-6 w-20 h-20 bg-white rounded-xl shadow-medium transition-all duration-300 overflow-hidden">
                        <img src="/professional-insights.png" alt="Professional Insights" className="w-28 h-28 object-cover scale-125" style={{objectPosition: 'center'}} />
                      </div>
                      <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">Professional Insights</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Get interview questions, salary estimates, and industry-specific recommendations tailored to your field
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-20 bg-primary/5">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
                  <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                    Join thousands of professionals who've boosted their career prospects with AI-powered resume optimization. 
                    Get your free analysis in under 30 seconds.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/analyzer">
                      <Button 
                        size="lg" 
                        className="px-8 py-6 text-lg font-semibold"
                      >
                        <Zap className="h-5 w-5 mr-2" />
                        Start Free Analysis Now
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>100% Free</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>No Registration Required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Instant Results</span>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="max-w-6xl mx-auto py-8">
              <AnalysisResults analysis={analysis} />
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className="border-t border-border/30 bg-card/30 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="font-bold text-xl mb-4 text-primary">ATS Resu-Mate</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  A full-stack web application built with React, TypeScript, and AI integration. 
                  Features resume analysis, ATS optimization, and modern UI/UX design.
                </p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure
                  </Badge>
                  <Badge variant="secondary">
                    <Zap className="h-3 w-3 mr-1" />
                    Fast
                  </Badge>
                  <Badge variant="secondary">
                    <Award className="h-3 w-3 mr-1" />
                    AI-Powered
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Key Features</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>ATS Optimization</div>
                  <div>AI Analysis</div>
                  <div>Skill Extraction</div>
                  <div>Interview Prep</div>
                  <div>Real-time Processing</div>
                  <div>Responsive Design</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Technologies Used</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>React & TypeScript</div>
                  <div>Vite Build Tool</div>
                  <div>Tailwind CSS</div>
                  <div>TextRazor API</div>
                  <div>Express.js Backend</div>
                  <div>Shadcn/ui Components</div>
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2025 ATS Resu-Mate - Personal Project Portfolio</p>
              <div className="mt-2 text-xs text-muted-foreground/60">
                Built with React, TypeScript, Tailwind CSS & TextRazor API Integration
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
