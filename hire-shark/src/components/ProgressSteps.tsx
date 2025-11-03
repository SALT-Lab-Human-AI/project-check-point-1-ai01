import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
  completed: boolean;
  active: boolean;
}

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const steps: Step[] = [
    { number: 1, label: "Upload Resume", completed: currentStep > 1, active: currentStep === 1 },
    { number: 2, label: "Review Extraction", completed: currentStep > 2, active: currentStep === 2 },
    { number: 3, label: "Set Preferences", completed: currentStep > 3, active: currentStep === 3 },
    { number: 4, label: "Find Matches", completed: currentStep > 4, active: currentStep === 4 },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center relative z-10 flex-1">
            <div className="flex items-center w-full">
              {index > 0 && (
                <div
                  className={cn(
                    "h-1 flex-1 transition-all duration-500",
                    step.completed ? "bg-success" : "bg-border"
                  )}
                />
              )}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 mx-2",
                  step.completed
                    ? "bg-success text-success-foreground"
                    : step.active
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step.completed ? <Check className="h-5 w-5" /> : step.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1 flex-1 transition-all duration-500",
                    step.completed ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-xs font-medium mt-2 text-center transition-colors",
                step.active ? "text-primary" : step.completed ? "text-success" : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
