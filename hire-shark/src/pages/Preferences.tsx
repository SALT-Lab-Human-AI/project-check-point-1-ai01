import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Briefcase, MapPin, DollarSign, Clock, Building, Target } from "lucide-react";

const Preferences = () => {
  const navigate = useNavigate();
  const [jobType, setJobType] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [customJobRole, setCustomJobRole] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [companySize, setCompanySize] = useState("");

  const handleContinue = () => {
    navigate("/matches");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12">
        <ProgressSteps currentStep={3} />
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Set Your Job Preferences</h2>
            <p className="text-muted-foreground">
              Help us find the perfect matches by telling us what you're looking for
            </p>
            <p className="text-xs text-muted-foreground mt-2">Step 3 of 4</p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-lg border animate-scale-in">
            <div className="space-y-6">
              {/* Job Type */}
              <div className="space-y-3">
                <Label htmlFor="job-type" className="flex items-center gap-2 text-base font-semibold">
                  <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  Job Type
                </Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="job-type" className="h-12">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Job Role */}
              <div className="space-y-3">
                <Label htmlFor="job-role" className="flex items-center gap-2 text-base font-semibold">
                  <div className="h-8 w-8 bg-chart-2/20 rounded-lg flex items-center justify-center">
                    <Target className="h-4 w-4 text-chart-2" />
                  </div>
                  Preferred Job Role
                </Label>
                <Select value={jobRole} onValueChange={setJobRole}>
                  <SelectTrigger id="job-role" className="h-12">
                    <SelectValue placeholder="Select preferred job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data-analyst">Data Analyst</SelectItem>
                    <SelectItem value="business-analyst">Business Analyst</SelectItem>
                    <SelectItem value="product-owner">Product Owner</SelectItem>
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                    <SelectItem value="project-manager">Project Manager</SelectItem>
                    <SelectItem value="software-engineer">Software Engineer</SelectItem>
                    <SelectItem value="data-scientist">Data Scientist</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="customer-success">Customer Success</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="custom-job-role"
                  placeholder="Or enter your preferred job role manually"
                  value={customJobRole}
                  onChange={(e) => setCustomJobRole(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Location Preference */}
              <div className="space-y-3">
                <Label htmlFor="location" className="flex items-center gap-2 text-base font-semibold">
                  <div className="h-8 w-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-success" />
                  </div>
                  Location Preference
                </Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location" className="h-12">
                    <SelectValue placeholder="Select location preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                    <SelectItem value="new-york">New York, NY</SelectItem>
                    <SelectItem value="austin">Austin, TX</SelectItem>
                    <SelectItem value="seattle">Seattle, WA</SelectItem>
                    <SelectItem value="boston">Boston, MA</SelectItem>
                    <SelectItem value="remote">Remote (Anywhere)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Work Mode */}
              <div className="space-y-3">
                <Label htmlFor="work-mode" className="flex items-center gap-2 text-base font-semibold">
                  <div className="h-8 w-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  Work Mode
                </Label>
                <Select value={workMode} onValueChange={setWorkMode}>
                  <SelectTrigger id="work-mode" className="h-12">
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Salary Range */}
              <div className="space-y-3">
                <Label htmlFor="salary" className="flex items-center gap-2 text-base font-semibold">
                  <div className="h-8 w-8 bg-warning/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-warning" />
                  </div>
                  Expected Salary Range
                </Label>
                <Select value={salary} onValueChange={setSalary}>
                  <SelectTrigger id="salary" className="h-12">
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-75k">$50,000 - $75,000</SelectItem>
                    <SelectItem value="75-100k">$75,000 - $100,000</SelectItem>
                    <SelectItem value="100-150k">$100,000 - $150,000</SelectItem>
                    <SelectItem value="150-200k">$150,000 - $200,000</SelectItem>
                    <SelectItem value="200k+">$200,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Company Size */}
              <div className="space-y-3">
                <Label htmlFor="company-size" className="flex items-center gap-2 text-base font-semibold">
                  <div className="h-8 w-8 bg-secondary/60 rounded-lg flex items-center justify-center">
                    <Building className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  Company Size
                </Label>
                <Select value={companySize} onValueChange={setCompanySize}>
                  <SelectTrigger id="company-size" className="h-12">
                    <SelectValue placeholder="Select preferred company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                    <SelectItem value="small">Small (51-200 employees)</SelectItem>
                    <SelectItem value="medium">Medium (201-1000 employees)</SelectItem>
                    <SelectItem value="large">Large (1001-5000 employees)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (5000+ employees)</SelectItem>
                    <SelectItem value="any">Any size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" size="lg" onClick={() => navigate("/review")}>
              ← Back
            </Button>
            <Button size="lg" onClick={handleContinue}>
              Find Matches →
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preferences;
