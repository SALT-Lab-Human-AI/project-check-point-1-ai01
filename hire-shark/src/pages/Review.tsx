import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Briefcase, Edit2, CheckCircle, AlertCircle, XCircle } from "lucide-react";

const Review = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12">
        <ProgressSteps currentStep={2} />
        
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Review Your Extracted Information</h2>
            <p className="text-muted-foreground">
              Please review and confirm the information we extracted from your resume. 
              You can edit any field or add missing information.
            </p>
            <p className="text-xs text-muted-foreground mt-2">Step 2 of 3</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Extracted Data */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        High Confidence
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input defaultValue="Sarah Johnson" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input defaultValue="sarah.johnson@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input defaultValue="San Francisco, CA" />
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-warning/20 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        Medium Confidence
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Job Title</label>
                      <Input defaultValue="Senior Software Engineer" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Company</label>
                      <Input defaultValue="TechCorp Inc." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Start Date</label>
                      <Input defaultValue="January 2020" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">End Date</label>
                      <Input defaultValue="Present" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea 
                      defaultValue="Led development of microservices architecture, improved system performance by 40%, managed team of 5 developers."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Profile Preview & Validation */}
            <div className="space-y-6">
              {/* Profile Preview */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-lg font-semibold mb-4">Profile Preview</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                      SJ
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>sarah.johnson@email.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold mb-2">Top Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">JavaScript</Badge>
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation Summary */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <h3 className="text-lg font-semibold mb-4">Validation Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Personal Info: Complete</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <span>Work Experience: Needs review</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Skills: Complete</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <span>Education: Missing fields</span>
                  </div>
                </div>
              </div>

              {/* Add Missing Section */}
              <div className="bg-muted/50 rounded-2xl p-6 border-2 border-dashed border-border animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <h3 className="text-sm font-semibold mb-3">Add Missing Section</h3>
                <Button variant="outline" className="w-full">
                  + Add Section
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 max-w-7xl mx-auto">
            <Button variant="outline" size="lg" onClick={() => navigate("/upload")}>
              ← Back
            </Button>
            <Button size="lg" onClick={() => navigate("/matches")}>
              Save & Continue →
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

const Mail = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Phone = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default Review;
