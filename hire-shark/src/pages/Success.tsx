import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { CheckCircle2, Sparkles } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobTitle, company } = location.state || { jobTitle: "this role", company: "" };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-scale-in">
            <div className="relative inline-block mb-6">
              <CheckCircle2 className="h-24 w-24 text-success" />
              <Sparkles className="h-8 w-8 text-accent absolute -top-2 -right-2 animate-pulse" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">
              Application Submitted! 🎉
            </h1>
            
            <div className="bg-card rounded-2xl p-8 shadow-lg border mb-8 animate-slide-up">
              <p className="text-lg text-muted-foreground mb-4">
                Your application for
              </p>
              <h2 className="text-2xl font-bold text-primary mb-2">
                {jobTitle}
              </h2>
              {company && (
                <p className="text-lg text-muted-foreground mb-6">
                  at {company}
                </p>
              )}
              <div className="h-px bg-border my-6" />
              <p className="text-sm text-muted-foreground">
                We've sent your resume and profile to the hiring team. 
                They'll review your application and get back to you soon!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                onClick={() => navigate("/matches")}
                className="shadow-lg"
              >
                View More Matches
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              💡 Tip: Keep exploring other opportunities while you wait!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
