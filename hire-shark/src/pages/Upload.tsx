import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Upload as UploadIcon, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileUpload = () => {
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      toast.success("Resume uploaded successfully!", {
        description: "Your resume has been analyzed. Click continue to review the extracted information.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12">
        <ProgressSteps currentStep={1} />
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Upload Section */}
          <div className="bg-card rounded-3xl p-8 shadow-lg border animate-fade-in">
            <h2 className="text-3xl font-bold mb-3">Upload Your Resume</h2>
            <p className="text-muted-foreground mb-8">
              We'll extract your education, work experience, and skills automatically. 
              You can review and edit everything afterward.
            </p>

            <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center space-y-4">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${
                  isUploaded ? "bg-success/20" : "bg-primary/20"
                }`}>
                  {isUploaded ? (
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  ) : (
                    <UploadIcon className="h-8 w-8 text-primary" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-semibold">
                    {isUploaded ? "Resume Uploaded!" : "Drag & drop your resume here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isUploaded ? "Ready to continue" : "or click to browse files"}
                  </p>
                </div>

                {!isUploaded && (
                  <Button
                    onClick={handleFileUpload}
                    disabled={isUploading}
                    className="mt-4"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {isUploading ? "Uploading..." : "Choose File"}
                  </Button>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Supported formats: PDF, DOCX, DOC (Max 10MB)
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/review")}
              disabled={!isUploaded}
              className="w-full mt-8"
            >
              Continue to Review →
            </Button>
          </div>

          {/* Right: Preview/Info */}
          <div className="space-y-6 animate-slide-up">
            <div className="bg-gradient-to-br from-secondary via-card to-secondary/50 rounded-3xl p-8 shadow-lg border">
              <h3 className="text-xl font-semibold mb-6">What We Extract</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border">
                  <div className="h-10 w-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Education</h4>
                    <p className="text-sm text-muted-foreground">
                      Degrees, institutions, graduation dates
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border">
                  <div className="h-10 w-10 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      Job titles, companies, dates, responsibilities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border">
                  <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Skills</h4>
                    <p className="text-sm text-muted-foreground">
                      Technical skills, tools, and technologies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
              <div className="flex gap-3">
                <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Privacy Notice</h4>
                  <p className="text-xs text-muted-foreground">
                    Your resume is processed securely and never shared without your permission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const GraduationCap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const Briefcase = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const Sparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export default Upload;
