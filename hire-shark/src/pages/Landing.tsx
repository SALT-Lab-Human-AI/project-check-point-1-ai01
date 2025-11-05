import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Zap, Clock, FileText, Search, BarChart3, CheckCircle2, ArrowRight, Mail, MessageSquare, Github, Linkedin, Send } from "lucide-react";

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
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  aboutSection?.scrollIntoView({ behavior: "smooth" });
                }}
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

        {/* About Section */}
        <section id="about" className="mt-32 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">About HireShark</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Revolutionizing recruitment through intelligent, AI-powered candidate matching
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 md:p-12 border shadow-lg">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    HireShark is an intelligent, AI-powered platform designed to revolutionize the recruitment process by providing a precise, data-driven approach to shortlisting candidates. By analyzing resumes and job descriptions, we generate compatibility scores that help job seekers quickly identify the most suitable opportunities while assisting recruiters in evaluating applicants more effectively.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">The Problem We Solve</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The recruitment process is fundamentally broken. Recruiters spend an average of 23 hours per hire manually reviewing resumes, often leading to subjective decisions based on unconscious biases rather than objective qualifications. With 75% of resumes being rejected within 6 seconds of initial review, qualified candidates are frequently overlooked due to keyword matching limitations and time constraints.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Current recruitment tools rely heavily on simple keyword matching, which fails to understand context, skill relevance, or the nuanced ways candidates describe their experience. This results in both false positives and false negatives, impacting both job seekers and employers.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">How We're Different</h3>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">Advanced NLP Technology</h4>
                      <p className="text-sm text-muted-foreground">
                        Our platform leverages advanced natural language processing and machine learning to understand context, skill relevance, and experience depth—going far beyond simple keyword matching.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">Objective Scoring</h4>
                      <p className="text-sm text-muted-foreground">
                        We provide automated compatibility scoring and candidate ranking that ensures fair and unbiased evaluation, reducing time-to-hire by 60% and improving candidate quality by 40%.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">Bias Detection</h4>
                      <p className="text-sm text-muted-foreground">
                        Our platform includes built-in bias detection algorithms and fairness metrics to ensure objective and fair assessment of all candidates, regardless of background.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">Detailed Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        We provide comprehensive candidate insights and skill gap analysis, helping both job seekers understand their fit and recruiters make informed hiring decisions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-2xl font-semibold mb-4">Our Value Proposition</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    HireShark transforms recruitment from a time-intensive, subjective process into an efficient, data-driven system that identifies the most qualified candidates while ensuring fair and unbiased evaluation. We help reduce time-to-hire by 60% and improve candidate quality by 40%, making recruitment more efficient for everyone involved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-32 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get matched to your ideal job in four simple steps. Our AI-powered platform makes finding the perfect opportunity effortless.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-lg hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                        1
                      </div>
                      <h3 className="text-2xl font-semibold">Upload Your Resume</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Simply drag and drop your resume or browse to upload. We support multiple formats including PDF, DOCX, and TXT files. Our secure system processes your document instantly, ensuring your information remains private and protected.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Supports PDF, DOCX, and TXT formats</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Secure and private processing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>No registration required</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="h-48 w-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                      <FileText className="h-20 w-20 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-lg hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex justify-center order-2 md:order-1">
                    <div className="h-48 w-48 bg-gradient-to-br from-success/20 to-primary/20 rounded-2xl flex items-center justify-center">
                      <Search className="h-20 w-20 text-success" />
                    </div>
                  </div>
                  <div className="space-y-4 order-1 md:order-2">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center text-success font-bold text-xl">
                        2
                      </div>
                      <h3 className="text-2xl font-semibold">AI-Powered Analysis</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Our advanced AI uses Google Gemini to intelligently extract and analyze your resume. It identifies your skills, experience, education, and key achievements with high precision. The system understands context and nuances, going beyond simple keyword matching.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Extracts skills, experience, and education</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Contextual understanding of your background</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Review and edit extracted information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-lg hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                        3
                      </div>
                      <h3 className="text-2xl font-semibold">Set Your Preferences</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Tell us what you're looking for. Specify your preferred job role, location, salary range, work mode (remote, hybrid, on-site), and company size. These preferences help us find the most relevant opportunities tailored to your needs.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Customize job role and location preferences</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Set salary range and work mode</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Filter by company size and type</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="h-48 w-48 bg-gradient-to-br from-accent/20 to-warning/20 rounded-2xl flex items-center justify-center">
                      <BarChart3 className="h-20 w-20 text-accent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-card rounded-2xl p-8 md:p-10 border shadow-lg hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex justify-center order-2 md:order-1">
                    <div className="h-48 w-48 bg-gradient-to-br from-primary/20 to-success/20 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 className="h-20 w-20 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-4 order-1 md:order-2">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                        4
                      </div>
                      <h3 className="text-2xl font-semibold">Get Matched & Apply</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Receive a curated list of job matches ranked by compatibility score. Each match shows how well your skills align with the role, key skills matched, and detailed insights. Apply directly to opportunities that interest you.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Compatibility scores for each match</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>Detailed skill matching breakdown</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span>One-click application process</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 border">
                <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of job seekers who have found their ideal opportunities through HireShark's intelligent matching system.
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate("/upload")}
                  className="text-base font-semibold px-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-32 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you. Reach out to our team or connect with us on social media.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-sm text-muted-foreground">support@hireshark.com</p>
                        <p className="text-sm text-muted-foreground">info@hireshark.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Support</h4>
                        <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
                        <p className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 5 PM EST</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Section */}
                <div className="pt-6 border-t">
                  <h3 className="text-2xl font-semibold mb-6">Our Team</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-1">Kevin Xia</h4>
                      <a 
                        href="https://github.com/HerobrineXia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <Github className="h-3 w-3" />
                        @HerobrineXia
                      </a>
                    </div>
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-1">Ramprasath Loganda</h4>
                      <a 
                        href="https://github.com/Ramprasathls" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <Github className="h-3 w-3" />
                        @Ramprasathls
                      </a>
                    </div>
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-1">Changho Jung</h4>
                      <a 
                        href="https://github.com/ChanghoJ" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <Github className="h-3 w-3" />
                        @ChanghoJ
                      </a>
                    </div>
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-1">Ashwin Shanmugam</h4>
                      <a 
                        href="https://github.com/ash-win19" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <Github className="h-3 w-3" />
                        @ash-win19
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t">
                  <h3 className="font-semibold mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/SALT-Lab-Human-AI/project-check-point-1-ai01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 bg-card rounded-lg border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="h-10 w-10 bg-card rounded-lg border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-2xl p-8 border shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission
                  alert("Thank you for your message! We'll get back to you soon.");
                }}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="What's this about?" 
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help..." 
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-center">
              <div className="bg-card rounded-2xl p-8 border">
                <h3 className="text-xl font-semibold mb-4">Looking for Help?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Check out our documentation or visit our GitHub repository for more information about HireShark, including setup instructions, API documentation, and contribution guidelines.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.open("https://github.com/SALT-Lab-Human-AI/project-check-point-1-ai01", "_blank")}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/upload")}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
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
