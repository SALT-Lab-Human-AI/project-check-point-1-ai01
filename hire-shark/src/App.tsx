import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PreferencesProvider } from "./store/PreferencesContext";
import { ResumeProvider } from "./store/ResumeContext";
import Landing from "./pages/Landing";
import Upload from "./pages/Upload";
import Review from "./pages/Review";
import Preferences from "./pages/Preferences";
import Matches from "./pages/Matches";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PreferencesProvider>
        <ResumeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/project-check-point-1-ai01/">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/review" element={<Review />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/success" element={<Success />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ResumeProvider>
      </PreferencesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
