import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ResumeProvider } from "./store/ResumeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ResumeProvider>
    <App />
  </ResumeProvider>
);
