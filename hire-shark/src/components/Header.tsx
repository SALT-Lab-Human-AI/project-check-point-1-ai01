import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Header = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img src={logo} alt="HireShark" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-foreground">HireShark</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          {location.pathname === "/" ? (
            <button
              onClick={() => {
                const aboutSection = document.getElementById("about");
                aboutSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </button>
          ) : (
            <Link to="/#about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
          )}
          {location.pathname === "/" ? (
            <button
              onClick={() => {
                const howItWorksSection = document.getElementById("how-it-works");
                howItWorksSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              How it Works
            </button>
          ) : (
            <Link to="/#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              How it Works
            </Link>
          )}
          {location.pathname === "/" ? (
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </button>
          ) : (
            <Link to="/#contact" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Contact
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-sm font-medium">
            Sign In
          </Button>
          <Button size="sm" className="text-sm font-medium">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
