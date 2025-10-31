import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Upload, Zap, Clock } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-background">
      <Header />
      
      <main className="container px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">
                Upload your resume and find your{" "}
                <span className="text-primary">ideal project match</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                We extract your experience, skills, and match you to suitable roles using advanced AI technology. 
                Find your perfect career opportunity in minutes.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/upload")}
                className="text-base font-semibold px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Resume
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold px-8"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">AI-powered matching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Instant results</span>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative animate-scale-in">
            <div className="relative bg-gradient-to-br from-secondary via-card to-secondary/50 rounded-3xl p-8 shadow-2xl border">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-6 p-8">
                  <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                    <Upload className="h-12 w-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Resume Analysis</h3>
                    <p className="text-sm text-muted-foreground">AI extracts your key skills</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-card rounded-2xl shadow-lg p-4 border animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-success/20 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">Resume Analyzed</p>
                    <p className="text-xs text-success">100%</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -left-4 bg-card rounded-2xl shadow-lg p-4 border animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">Matching Roles</p>
                    <p className="text-xs text-primary">12 Found</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-success/20 rounded-xl flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Upload</h3>
            <p className="text-sm text-muted-foreground">
              Simply drag and drop your resume. We support PDF, DOCX, and DOC formats.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes your skills and experience to find the best opportunities.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
            <p className="text-sm text-muted-foreground">
              Get matched to relevant positions in seconds, not days or weeks.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default Landing;
