import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeUploadProps {
  onResumeSubmit: (resumeText: string) => void;
  isAnalyzing: boolean;
}

export const ResumeUpload = ({ onResumeSubmit, isAnalyzing }: ResumeUploadProps) => {
  const [resumeText, setResumeText] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback((file: File) => {
    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a text file (.txt) or paste your resume text directly.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setResumeText(text);
    };
    reader.readAsText(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleSubmit = () => {
    if (!resumeText.trim()) {
      toast({
        title: "Resume required",
        description: "Please upload a resume file or paste your resume text.",
        variant: "destructive",
      });
      return;
    }

    onResumeSubmit(resumeText.trim());
  };

  return (
  <Card className="bg-gradient-card border-border/50 shadow-medium transition-all duration-500">
      <CardContent className="p-10">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Upload Your Resume</h2>
            <p className="text-muted-foreground text-lg">
              Get AI-powered insights to improve your resume and land your dream job
            </p>
          </div>

          <div
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
              ${isDragOver 
                ? 'border-primary bg-primary/10' 
                : 'border-border/50'
              }
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="p-4 bg-gradient-primary rounded-xl mx-auto mb-6 w-fit shadow-medium">
              <Upload className="h-8 w-8 text-primary-foreground" />
            </div>
            <p className="text-xl font-medium mb-3">Drop your resume here</p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports .txt files or paste text directly below
            </p>
            <input
              type="file"
              accept=".txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium flex items-center gap-2">
              <div className="p-1 bg-gradient-primary rounded">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              Or paste your resume text
            </label>
            <Textarea
              placeholder="Paste your complete resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[200px] resize-none bg-background/50 border-border/50 transition-colors duration-200"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={isAnalyzing || !resumeText.trim()}
            className="w-full bg-gradient-primary transition-all duration-300"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-5 w-5" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};