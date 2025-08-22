import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeUploadProps {
  onResumeSubmit: (resumeText: string) => void;
  isAnalyzing: boolean;
}

export const ResumeUpload = ({ onResumeSubmit, isAnalyzing }: ResumeUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const { toast } = useToast();

  const handleFileUpload = useCallback((file: File) => {
    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a text file (.txt) only.",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setResumeText(text);
      setSelectedFile(file);
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

  const handleSubmit = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "Resume text required",
        description: "Please upload a text file or the file is empty.",
        variant: "destructive",
      });
      return;
    }
    
    onResumeSubmit(resumeText);
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-medium transition-all duration-500">
      <CardContent className="p-4 md:p-10">
        <div className="space-y-6 md:space-y-8">
          <div className="text-center">
            <h2 className="text-xl md:text-3xl font-semibold mb-2 md:mb-3 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Upload Your Resume</h2>
            <p className="text-muted-foreground text-sm md:text-lg px-2">
              Upload a text file (.txt) of your resume to get AI-powered improvement suggestions.
            </p>
          </div>

          <div
            className={`
              relative border-2 border-dashed rounded-xl p-6 md:p-12 text-center transition-all duration-300
              ${isDragOver 
                ? 'border-primary bg-primary/10' 
                : 'border-border/50'
              }
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="p-3 md:p-4 bg-gradient-primary rounded-xl mx-auto mb-4 md:mb-6 w-fit shadow-medium">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
            </div>
            <p className="text-lg md:text-xl font-medium mb-2 md:mb-3">Drop your resume text file here</p>
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
              Supports .txt files only
            </p>
            <input
              type="file"
              accept=".txt,text/plain"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {selectedFile && (
              <div className="mt-3 md:mt-4 text-xs md:text-sm text-primary">
                Selected: {selectedFile.name}
                <div className="text-xs text-muted-foreground mt-1">
                  {resumeText.length} characters loaded
                </div>
              </div>
            )}
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={isAnalyzing || !resumeText.trim()}
            className="w-full bg-gradient-primary transition-all duration-300"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};