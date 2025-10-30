import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Code, TrendingUp, Paintbrush, Megaphone, Info, ArrowLeft } from "lucide-react";

interface JobMatch {
  id: number;
  title: string;
  company: string;
  match: number;
  icon: any;
  iconBg: string;
  skills: string[];
  description: string;
  requirements: string[];
}

const Matches = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);

  const matches: JobMatch[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      match: 95,
      icon: Code,
      iconBg: "bg-primary/20 text-primary",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      description: "We're looking for an experienced frontend developer to lead our web application development.",
      requirements: ["5+ years React experience", "Strong TypeScript skills", "Leadership experience"],
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLab Inc",
      match: 92,
      icon: TrendingUp,
      iconBg: "bg-accent/20 text-accent",
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      description: "Join our product team to drive innovation and deliver exceptional user experiences.",
      requirements: ["3+ years product management", "Technical background", "Agile methodology"],
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "CreativeStudio",
      match: 87,
      icon: Paintbrush,
      iconBg: "bg-success/20 text-success",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      description: "Create beautiful and intuitive designs for our digital products and services.",
      requirements: ["Portfolio required", "Figma expertise", "User research experience"],
    },
    {
      id: 4,
      title: "Marketing Specialist",
      company: "GrowthCo",
      match: 84,
      icon: Megaphone,
      iconBg: "bg-warning/20 text-warning",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
      description: "Drive our marketing initiatives and help us reach new audiences.",
      requirements: ["2+ years marketing", "SEO knowledge", "Content creation skills"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12">
        <ProgressSteps currentStep={3} />
        
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
              onClick={() => navigate("/review")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Match Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {matches.map((match, index) => (
              <div
                key={match.id}
                className="bg-card rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${match.iconBg}`}>
                    <match.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{match.title}</h3>
                    <p className="text-sm text-muted-foreground">{match.company}</p>
                  </div>
                  <Badge
                    className={`${
                      match.match >= 90
                        ? "bg-success/10 text-success border-success/20"
                        : match.match >= 85
                        ? "bg-accent/10 text-accent border-accent/20"
                        : "bg-warning/10 text-warning border-warning/20"
                    }`}
                  >
                    {match.match}% Match
                  </Badge>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Key Skills Matched:</p>
                  <div className="flex flex-wrap gap-2">
                    {match.skills.map((skill) => (
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
                    {match.match >= 90 ? "Apply Now" : "Express Interest"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

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
                    {selectedJob.match}% Match
                  </Badge>
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${selectedJob.iconBg}`}>
                    <selectedJob.icon className="h-6 w-6" />
                  </div>
                </div>
                
                <h3 className="font-semibold mb-2">About This Role</h3>
                <p className="text-muted-foreground">{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-success mt-0.5">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Matched Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
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
                  Apply Now
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
