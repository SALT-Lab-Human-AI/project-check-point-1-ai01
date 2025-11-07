import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Code, TrendingUp, Paintbrush, Megaphone, Info, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useResume } from "@/store/ResumeContext";
import { MatchResult } from "@/types";
import { toast } from "@/hooks/use-toast";

const Matches = () => {
  const navigate = useNavigate();
  const { matches, isMatching, resume, runMatching } = useResume();
  const [selectedJob, setSelectedJob] = useState<MatchResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!resume?.parsed) {
      navigate("/upload");
    }
  }, [resume, navigate]);

  // Trigger matching when page loads if we have a parsed resume but no matches yet
  useEffect(() => {
    console.log("Matches useEffect", resume?.parsed, matches.length, isMatching, hasSearched);
    if (resume?.parsed && !isMatching && !hasSearched) {
      setHasSearched(true);
      runMatching().catch((error) => {
        console.error("Error running matching:", error);
        toast({
          title: "Error fetching matches",
          description: "Failed to fetch jobs. Please try again.",
          variant: "destructive",
        });
      });
    }
  }, [resume?.parsed, matches.length, isMatching, hasSearched, runMatching]);

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes("frontend")) return Code;
    if (title.toLowerCase().includes("backend")) return Code;
    if (title.toLowerCase().includes("manager")) return TrendingUp;
    if (title.toLowerCase().includes("design")) return Paintbrush;
    if (title.toLowerCase().includes("marketing")) return Megaphone;
    return Code;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12">
        <ProgressSteps currentStep={4} />
        
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Your Best Matches</h2>
            <p className="text-muted-foreground">
              We've analyzed your profile and found these top opportunities that align with your skills and experience.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-4 shadow-sm border mb-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select className="text-sm border rounded-lg px-3 py-1.5 bg-background">
                <option>Match Score</option>
                <option>Recent</option>
                <option>Company</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter:</span>
              <select className="text-sm border rounded-lg px-3 py-1.5 bg-background">
                <option>All Categories</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Product</option>
              </select>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={() => navigate("/preferences")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Edit Preferences
            </Button>
          </div>

          {/* Loading State */}
          {isMatching && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg font-medium">Finding your perfect matches...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Finding the best job matches for you
              </p>
            </div>
          )}

          {/* No Matches State */}
          {!isMatching && matches.length === 0 && hasSearched && (
            <div className="flex flex-col items-center justify-center py-12 bg-card rounded-2xl border">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No matches found</p>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                We couldn't find any jobs matching your preferences. Try adjusting your preferences or search again.
              </p>
              <Button onClick={() => navigate("/preferences")}>
                Edit Preferences
              </Button>
            </div>
          )}

          {/* Match Cards */}
          {!isMatching && matches.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {matches.map((match, index) => {
              const Icon = getIcon(match.title);
              const applyLink = match.applyUrl || match.url;
              return (
              <div
                key={match.jobId}
                className="bg-card rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-primary/20 text-primary`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{match.title}</h3>
                    <p className="text-sm text-muted-foreground">{match.company}</p>
                  </div>
                  <Badge
                    className={`${
                      match.score >= 0.9
                        ? "bg-success/10 text-success border-success/20"
                        : match.score >= 0.8
                        ? "bg-accent/10 text-accent border-accent/20"
                        : "bg-warning/10 text-warning border-warning/20"
                    }`}
                  >
                    {Math.round(match.score * 100)}% Match
                  </Badge>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Key Skills Matched:</p>
                  <div className="flex flex-wrap gap-2">
                    {match.matchedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedJob(match)}
                  >
                    <Info className="h-4 w-4 mr-1" />
                    Why this match?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedJob(match)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate("/success", { 
                      state: { jobTitle: match.title, company: match.company } 
                    })}
                  >
                    Express Interest
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    variant="secondary"
                    disabled={!applyLink}
                    asChild
                  >
                    <a
                      href={applyLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply
                    </a>
                  </Button>
                </div>
              </div>
            )})
          }
          </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-12">
            <Button variant="outline" size="lg" onClick={() => navigate("/upload")}>
              Try Again
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/")}>
              Home
            </Button>
          </div>
        </div>
      </main>

      {/* Job Details Modal */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedJob?.title}</DialogTitle>
            <DialogDescription className="text-base">{selectedJob?.company}</DialogDescription>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-6 mt-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-success/10 text-success border-success/20 text-base px-4 py-1">
                    {Math.round(selectedJob.score * 100)}% Match
                  </Badge>
                </div>
                
                <h3 className="font-semibold mb-2">About This Role</h3>
                <p className="text-muted-foreground">{selectedJob.snippet}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Matched Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.matchedSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={() => navigate("/success", { 
                    state: { jobTitle: selectedJob.title, company: selectedJob.company } 
                  })}
                >
                  Express Interest
                </Button>
                <Button
                  className="flex-1"
                  size="lg"
                  variant="secondary"
                  disabled={!selectedJob.applyUrl && !selectedJob.url}
                  asChild
                >
                  <a
                    href={(selectedJob.applyUrl || selectedJob.url) ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" size="lg" onClick={() => setSelectedJob(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Matches;
