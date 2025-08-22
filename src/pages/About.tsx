import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Star,
  Award,
  Brain,
  Search
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced TextRazor API integration provides intelligent resume analysis with natural language processing."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "ATS Optimization",
      description: "Optimize your resume for Applicant Tracking Systems to increase your chances of getting noticed by recruiters."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Text File Upload",
      description: "Simple and secure text file (.txt) upload system for analyzing your resume content instantly."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Performance Scoring",
      description: "Get detailed scores and metrics to understand your resume's strengths and areas for improvement."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Smart Suggestions",
      description: "Receive actionable recommendations powered by AI to enhance your resume's impact and effectiveness."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Skill Extraction",
      description: "Automatically identifies and analyzes technical and professional skills mentioned in your resume."
    }
  ];

  const benefits = [
    "Increase interview callback rates by up to 40%",
    "Identify and fix ATS compatibility issues",
    "Get personalized improvement recommendations",
    "Analyze skill relevance and market demand",
    "Optimize keyword density for better visibility",
    "Professional formatting and structure guidance"
  ];

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Vite", category: "Build Tool" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "TextRazor API", category: "AI/NLP" },
    { name: "Express.js", category: "Backend" },
    { name: "Shadcn/ui", category: "UI Components" }
  ];

  return (
    <>
      <HomeNavbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-2xl">
                <Award className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              About ATS Resu-Mate
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your intelligent resume companion powered by advanced AI technology. 
              Transform your resume into a powerful tool that gets noticed by employers and passes through ATS filters with confidence.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Free Analysis
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Secure & Private
              </Badge>
            </div>
          </div>

          {/* Mission Statement */}
          <Card className="mb-16 border-none shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
              <CardDescription className="text-lg max-w-4xl mx-auto">
                We believe everyone deserves a fair chance to showcase their talents. Our mission is to democratize access to professional resume optimization tools, 
                helping job seekers at all levels create compelling resumes that stand out in today's competitive job market.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl mb-4 flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  Why Choose ATS Resu-Mate?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl mb-4 flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  Who Benefits?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Recent Graduates</h4>
                    <p className="text-muted-foreground">Get guidance on creating your first professional resume with industry best practices.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Career Changers</h4>
                    <p className="text-muted-foreground">Optimize your resume to highlight transferable skills for your new career path.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Experienced Professionals</h4>
                    <p className="text-muted-foreground">Ensure your resume meets modern ATS requirements and industry standards.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Job Seekers</h4>
                    <p className="text-muted-foreground">Increase your chances of landing interviews with optimized, ATS-friendly resumes.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technology Stack */}
          <Card className="mb-16 border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Built with Modern Technology</CardTitle>
              <CardDescription className="text-lg">
                Powered by cutting-edge tools and APIs to deliver the best resume analysis experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {techStack.map((tech, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="font-semibold text-lg">{tech.name}</div>
                    <div className="text-sm text-muted-foreground">{tech.category}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="mb-16 border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">How It Works</CardTitle>
              <CardDescription className="text-lg">
                Simple, fast, and secure resume analysis in three easy steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-semibold text-xl mb-3">Upload Resume</h4>
                  <p className="text-muted-foreground">
                    Upload your resume in text format (.txt) for quick and secure analysis
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-semibold text-xl mb-3">AI Analysis</h4>
                  <p className="text-muted-foreground">
                    Our AI engine analyzes your content using advanced natural language processing
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-semibold text-xl mb-3">Get Results</h4>
                  <p className="text-muted-foreground">
                    Receive detailed insights, scores, and actionable recommendations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4 flex items-center justify-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-xl mb-3">Data Protection</h4>
                  <p className="text-muted-foreground mb-4">
                    Your resume data is processed securely and never stored permanently on our servers. 
                    We prioritize your privacy and follow industry best practices for data handling.
                  </p>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">No permanent data storage</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-xl mb-3">Secure Processing</h4>
                  <p className="text-muted-foreground mb-4">
                    All resume analysis is performed using encrypted connections and secure API endpoints. 
                    Your personal information remains confidential throughout the entire process.
                  </p>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Encrypted data transmission</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-16" />

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Boost Your Resume?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have improved their resumes with ATS Resu-Mate. 
              Start your free analysis today and take the first step towards landing your dream job.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="px-6 py-3 text-base">
                <Star className="h-4 w-4 mr-2" />
                100% Free
              </Badge>
              <Badge variant="outline" className="px-6 py-3 text-base">
                <Zap className="h-4 w-4 mr-2" />
                Instant Results
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
