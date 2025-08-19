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
    <Card className="shadow-soft hover:shadow-medium transition-[box-shadow] duration-300">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Upload Your Resume</h2>
            <p className="text-muted-foreground">
              Get AI-powered insights to improve your resume and land your dream job
            </p>
          </div>

          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
              ${isDragOver 
                ? 'border-primary bg-accent/50' 
                : 'border-border hover:border-primary/50'
              }
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Drop your resume here</p>
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

          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Or paste your resume text
            </label>
            <Textarea
              placeholder="Paste your complete resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={isAnalyzing || !resumeText.trim()}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              'Analyze Resume'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};