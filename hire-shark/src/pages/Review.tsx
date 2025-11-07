import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Briefcase, Edit2, CheckCircle, AlertCircle, XCircle, Mail, Phone, MapPin, GraduationCap, ChevronDown, ChevronUp, MinusCircle, PlusCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useResume } from "@/store/ResumeContext";
import { LoadingModal } from "@/components/LoadingModal";
import { GeneratingRolesModal } from "@/components/GeneratingRolesModal";
import { useEffect, useState } from "react";

const getConfidenceText = (score: number) => {
  if (score > 0.75) return "High Confidence";
  if (score > 0.40) return "Medium Confidence";
  return "Low Confidence";
};

const getConfidenceBadgeClass = (score: number) => {
  if (score > 0.75) return "bg-success/10 text-success border-success/20";
  if (score > 0.40) return "bg-warning/10 text-warning border-warning/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
};

const Review = () => {
  const navigate = useNavigate();
  const { resume, runMatching, generateJobRolesFromEditedResume, saveEditedResume } = useResume();
  const [editedResume, setEditedResume] = useState(resume);
  const [skillsText, setSkillsText] = useState('');
  const [openEducation, setOpenEducation] = useState<boolean[]>([]);
  const [openExperience, setOpenExperience] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!resume) {
      navigate("/upload");
    }
    setEditedResume(resume);
    if (resume?.parsed?.skills) {
      setSkillsText(resume.parsed.skills.join(', '));
    }
    if (resume?.parsed?.education) {
      setOpenEducation(Array(resume.parsed.education.length).fill(false));
    }
    if (resume?.parsed?.experiences) {
      setOpenExperience(Array(resume.parsed.experiences.length).fill(false));
    }
  }, [resume, navigate]);

  const handleRunMatching = async () => {
    const targetResume = editedResume ?? resume;
    if (!targetResume) return;
    await runMatching(targetResume);
    navigate("/matches");
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedResume((prev) => ({
      ...prev,
      parsed: {
        ...prev.parsed,
        [name]: value,
      },
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setSkillsText(value);
    setEditedResume((prev) => ({
      ...prev,
      parsed: {
        ...prev.parsed,
        skills: value.split(',').map(skill => skill.trim()),
      },
    }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const newEducation = [...editedResume.parsed.education];
    if (name === 'honors') {
      newEducation[index] = { ...newEducation[index], [name]: value.split('\n') };
    } else {
      newEducation[index] = { ...newEducation[index], [name]: value };
    }
    setEditedResume((prev) => ({
      ...prev,
      parsed: {
        ...prev.parsed,
        education: newEducation,
      },
    }));
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const newExperiences = [...editedResume.parsed.experiences];
    if (name === 'bullets') {
      newExperiences[index] = { ...newExperiences[index], [name]: value.split('\n') };
    } else {
      newExperiences[index] = { ...newExperiences[index], [name]: value };
    }
    setEditedResume((prev) => ({
      ...prev,
      parsed: {
        ...prev.parsed,
        experiences: newExperiences,
      },
    }));
  };

  const addEducation = () => {
    const newEducation = [...editedResume.parsed.education, { degree: '', field: '', institution: '', location: '', start: '', end: '', gpa: '', honors: [] }];
    setEditedResume((prev) => ({
      ...prev,
      parsed: {
        ...prev.parsed,
        education: newEducation,
      },
    }));
  };

  const removeEducation = (index: number) => {
    const newEducation = [...editedResume.parsed.education];
    newEducation.splice(index, 1);
    setEditedResume((prev) => ({
      ...prev,
      parsed: {
        ...prev.parsed,
        education: newEducation,
      },
    }));
  };

  const addExperience = () => {
    const newExperiences = [...editedResume.parsed.experiences, { title: '', company: '', start: '', end: '', bullets: [] }];
    setEditedResume((prev) => ({
      ...prev,
      parsed: {
        ...prev.parsed,
        experiences: newExperiences,
      },
    }));
  };

  const removeExperience = (index: number) => {
    const newExperiences = [...editedResume.parsed.experiences];
    newExperiences.splice(index, 1);
    setEditedResume((prev) => ({
      ...prev,
      parsed: {
        ...prev.parsed,
        experiences: newExperiences,
      },
    }));
  };

  const handleSaveAndContinue = async () => {
    if (!editedResume) {
      return;
    }
    saveEditedResume(editedResume);
    setIsLoading(true);
    try {
      await generateJobRolesFromEditedResume(editedResume);
      navigate("/preferences");
    } catch (error) {
      console.error("Error generating job roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <p className="text-xs text-muted-foreground mt-2">Step 2 of 4</p>
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
                      <Badge variant="outline" className={getConfidenceBadgeClass(resume?.parsed?.confidence?.personalInfo ?? 0)}>
                        {getConfidenceText(resume?.parsed?.confidence?.personalInfo ?? 0)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input name="name" value={editedResume?.parsed?.name} onChange={handlePersonalInfoChange} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input name="email" value={editedResume?.parsed?.email} onChange={handlePersonalInfoChange} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input name="phone" value={editedResume?.parsed?.phone} onChange={handlePersonalInfoChange} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input name="location" value={editedResume?.parsed?.location} onChange={handlePersonalInfoChange} />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Education</h3>
                      <Badge variant="outline" className={getConfidenceBadgeClass(resume?.parsed?.confidence?.education ?? 0)}>
                        {getConfidenceText(resume?.parsed?.confidence?.education ?? 0)}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={addEducation}>
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {editedResume?.parsed?.education && editedResume.parsed.education.length > 0 ? (
                    editedResume.parsed.education.map((edu, index) => (
                      <Collapsible key={index} onOpenChange={(isOpen) => setOpenEducation(prev => { const newState = [...prev]; newState[index] = isOpen; return newState; })}>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <CollapsibleTrigger className="w-full text-left">
                          <p className="font-semibold">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        </CollapsibleTrigger>
                        <div className="flex items-center">
                          <Button variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                            <MinusCircle className="h-5 w-5 text-destructive" />
                          </Button>
                          <CollapsibleTrigger>
                            {openEducation[index] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </CollapsibleTrigger>
                        </div>
                      </div>
                        <CollapsibleContent className="p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Degree</label>
                              <Input name="degree" value={edu.degree} onChange={(e) => handleEducationChange(e, index)} placeholder="e.g., Bachelor's, Master's, PhD" />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Field of Study</label>
                              <Input name="field" value={edu.field} onChange={(e) => handleEducationChange(e, index)} placeholder="e.g., Computer Science, Business" />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Institution</label>
                              <Input name="institution" value={edu.institution} onChange={(e) => handleEducationChange(e, index)} placeholder="University or School name" />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Location</label>
                              <Input name="location" value={edu.location} onChange={(e) => handleEducationChange(e, index)} placeholder="City, State/Country" />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Start Date</label>
                              <Input name="start" value={edu.start} onChange={(e) => handleEducationChange(e, index)} placeholder="e.g., Sep 2018" />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">End Date</label>
                              <Input name="end" value={edu.end} onChange={(e) => handleEducationChange(e, index)} placeholder="e.g., May 2022 or Present" />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">GPA</label>
                              <Input name="gpa" value={edu.gpa} onChange={(e) => handleEducationChange(e, index)} placeholder="e.g., 3.8/4.0" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-sm font-medium mb-2 block">Honors & Awards</label>
                              <Textarea 
                                name="honors"
                                value={edu.honors?.join('\n')}
                                onChange={(e) => handleEducationChange(e, index)}
                                rows={2}
                                placeholder="Honors, distinctions, or awards"
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                      <p className="text-sm">No education information found. Please add your education details.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border animate-slide-up" style={{ animationDelay: "0.15s" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-warning/20 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Badge variant="outline" className={getConfidenceBadgeClass(resume?.parsed?.confidence?.experience ?? 0)}>
                        {getConfidenceText(resume?.parsed?.confidence?.experience ?? 0)}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={addExperience}>
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {editedResume?.parsed?.experiences && editedResume.parsed.experiences.length > 0 ? (
                    editedResume?.parsed?.experiences?.map((exp, index) => (
                      <Collapsible key={index} onOpenChange={(isOpen) => setOpenExperience(prev => { const newState = [...prev]; newState[index] = isOpen; return newState; })}>
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <CollapsibleTrigger className="w-full text-left">
                            <p className="font-semibold">{exp.title}{exp.company && ` at ${exp.company}`}</p>
                            <p className="text-sm text-muted-foreground">{exp.start} - {exp.end}</p>
                          </CollapsibleTrigger>
                          <div className="flex items-center">
                            <Button variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                              <MinusCircle className="h-5 w-5 text-destructive" />
                            </Button>
                            <CollapsibleTrigger>
                              {openExperience[index] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </CollapsibleTrigger>
                          </div>
                        </div>
                        <CollapsibleContent className="p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Job Title</label>
                              <Input name="title" value={exp.title} onChange={(e) => handleExperienceChange(e, index)} />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Company</label>
                              <Input name="company" value={exp.company} onChange={(e) => handleExperienceChange(e, index)} />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Start Date</label>
                              <Input name="start" value={exp.start} onChange={(e) => handleExperienceChange(e, index)} />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">End Date</label>
                              <Input name="end" value={exp.end} onChange={(e) => handleExperienceChange(e, index)} />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-sm font-medium mb-2 block">Description</label>
                              <Textarea 
                                name="bullets"
                                value={exp.bullets?.join('\n')}
                                onChange={(e) => handleExperienceChange(e, index)}
                                rows={3}
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                      <p className="text-sm">No work experience information found. Please add your work experience details.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-success/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Skills</h3>
                      <Badge variant="outline" className={getConfidenceBadgeClass(resume?.parsed?.confidence?.skills ?? 0)}>
                        {getConfidenceText(resume?.parsed?.confidence?.skills ?? 0)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Top Skills (comma-separated)</label>
                  <Textarea 
                    value={skillsText}
                    onChange={handleSkillsChange}
                    rows={3}
                  />
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
                      {editedResume?.parsed?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{editedResume?.parsed?.name}</h4>
                      <p className="text-sm text-muted-foreground">{editedResume?.parsed?.experiences?.[0]?.title}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{editedResume?.parsed?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{editedResume?.parsed?.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{editedResume?.parsed?.location}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold mb-2">Top Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {editedResume?.parsed?.skills.map((skill, index) => <Badge key={`${skill}-${index}`} variant="secondary">{skill}</Badge>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation Summary */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <h3 className="text-lg font-semibold mb-4">Validation Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    {resume?.parsed?.name ? (
                      resume?.parsed?.confidence?.personalInfo > 0.75 ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Personal Info: Complete</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-warning" />
                          <span>Personal Info: Needs review</span>
                        </>
                      )
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span>Personal Info: Missing fields</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {resume?.parsed?.experiences && resume.parsed.experiences.length > 0 ? (
                      resume?.parsed?.confidence?.experience > 0.75 ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Work Experience: Complete</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-warning" />
                          <span>Work Experience: Needs review</span>
                        </>
                      )
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span>Work Experience: Missing fields</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {resume?.parsed?.skills && resume.parsed.skills.length > 0 ? (
                      resume?.parsed?.confidence?.skills > 0.75 ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Skills: Complete</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-warning" />
                          <span>Skills: Needs review</span>
                        </>
                      )
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span>Skills: Missing fields</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {resume?.parsed?.education && resume.parsed.education.length > 0 ? (
                      resume?.parsed?.confidence?.education > 0.75 ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Education: Complete</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-warning" />
                          <span>Education: Needs review</span>
                        </>
                      )
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span>Education: Missing fields</span>
                      </>
                    )}
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 max-w-7xl mx-auto">
            <Button variant="outline" size="lg" onClick={() => navigate("/upload")}>
              ← Back
            </Button>
            <Button size="lg" onClick={handleSaveAndContinue}>
              Save & Continue →
            </Button>
          </div>
        </div>
      </main>
      <GeneratingRolesModal isOpen={isLoading} onClose={() => setIsLoading(false)} />
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
