import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = (theme as string | undefined) ?? "light";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img src={logo} alt="HireShark" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-foreground">HireShark</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors" onClick={() => window.scrollTo(0, 0)}>
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
          {mounted && (
            <div className="flex items-center gap-1 rounded-full border bg-muted/60 p-1 shadow-sm">
              <Button
                size="icon"
                variant={currentTheme === "light" ? "default" : "ghost"}
                onClick={() => setTheme("light")}
                aria-label="Switch to light mode"
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={currentTheme === "dark" ? "default" : "ghost"}
                onClick={() => setTheme("dark")}
                aria-label="Switch to dark mode"
                className="h-9 w-9"
              >
                <Moon className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button size="sm" className="text-sm font-medium" onClick={() => navigate("/upload")}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
