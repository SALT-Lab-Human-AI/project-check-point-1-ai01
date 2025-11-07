import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Briefcase, MapPin, DollarSign, Clock, Building, Target } from "lucide-react";
import { usePreferences } from "@/store/PreferencesContext";
import { useResume } from "@/store/ResumeContext";

const minSalaryOptions = [
  { value: "0", label: "Less than $2,000" },
  { value: "2000", label: "$2,000" },
  { value: "3000", label: "$3,000" },
  { value: "4000", label: "$4,000" },
  { value: "5000", label: "$5,000" },
  { value: "6000", label: "$6,000" },
  { value: "7000", label: "$7,000" },
  { value: "8000", label: "$8,000" },
];

const maxSalaryOptions = [
  { value: "3000", label: "$3,000" },
  { value: "4000", label: "$4,000" },
  { value: "5000", label: "$5,000" },
  { value: "6000", label: "$6,000" },
  { value: "7000", label: "$7,000" },
  { value: "8000", label: "$8,000" },
  { value: "9000", label: "$9,000+" },
];

const Preferences = () => {
  const navigate = useNavigate();
  const { preferences, updatePreferences } = usePreferences();
  const { resume, generatedJobRoles, generatedLocations } = useResume();
  
  const [jobType, setJobType] = useState(preferences.jobType || "");
  const [jobRole, setJobRole] = useState(preferences.jobRole || "");
  const [customJobRole, setCustomJobRole] = useState(preferences.customJobRole || "");
  const [customLocation, setCustomLocation] = useState(preferences.customLocation || "");
  const [location, setLocation] = useState(preferences.location || "");
  const [salary, setSalary] = useState(preferences.salary || "");
  const [workMode, setWorkMode] = useState(preferences.workMode || "");
  const [companySize, setCompanySize] = useState(preferences.companySize || "");
  const [minSalary, setMinSalary] = useState(preferences.minSalary || "");
  const [maxSalary, setMaxSalary] = useState(preferences.maxSalary || "");

  useEffect(() => {
    return () => {
      setCustomJobRole("");
      setCustomLocation("");
    };
  }, []);



  const handleContinue = async () => {
    if (minSalary && maxSalary && parseInt(minSalary) > parseInt(maxSalary)) {
      alert("Maximum salary must be greater than minimum salary.");
      return;
    }
    // Save final preferences
    updatePreferences({
      jobType,
      jobRole,
      customJobRole,
      location,
      customLocation,
      minSalary,
      maxSalary,
      workMode,
      companySize,
    });
    
    // Navigate to matches page - matching will be triggered there
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
                    {generatedJobRoles.map((role) => (
                      <SelectItem key={role} value={role.toLowerCase().replace(/ /g, "-")}>{role}</SelectItem>
                    ))}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {jobRole === "other" && (
                  <Input
                    id="custom-job-role"
                    placeholder="Or enter your preferred job role manually"
                    value={customJobRole}
                    onChange={(e) => setCustomJobRole(e.target.value)}
                    className="h-12"
                  />
                )}
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
                    {resume?.parsed?.location && <SelectItem value={resume.parsed.location.toLowerCase().replace(/ /g, "-")}>{resume.parsed.location}</SelectItem>}
                    {generatedLocations.map((loc) => (
                      <SelectItem key={loc} value={loc.toLowerCase().replace(/ /g, "-")}>{loc}</SelectItem>
                    ))}
                    <SelectItem value="remote">Remote (Anywhere)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {location === "other" && (
                  <Input
                    id="custom-location"
                    placeholder="Or enter your preferred location manually"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="h-12"
                  />
                )}
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
                  Expected Monthly Salary Range
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={minSalary} onValueChange={setMinSalary}>
                    <SelectTrigger id="min-salary" className="h-12">
                      <SelectValue placeholder="Minimum" />
                    </SelectTrigger>
                    <SelectContent>
                      {minSalaryOptions.filter(option => !maxSalary || parseInt(option.value) < parseInt(maxSalary)).map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={maxSalary} onValueChange={setMaxSalary}>
                    <SelectTrigger id="max-salary" className="h-12">
                      <SelectValue placeholder="Maximum" />
                    </SelectTrigger>
                    <SelectContent>
                      {maxSalaryOptions.filter(option => !minSalary || parseInt(option.value) > parseInt(minSalary)).map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
