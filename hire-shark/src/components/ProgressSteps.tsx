import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  currentStep: number;
}

const STEP_DEFS = [
  { number: 1, label: "Upload Resume" },
  { number: 2, label: "Review Extraction" },
  { number: 3, label: "Set Preferences" },
  { number: 4, label: "Find Matches" },
] as const;

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {STEP_DEFS.map((step, index) => {
          const isLastStep = step.number === STEP_DEFS.length;
          const isCompleted =
            currentStep > step.number || (isLastStep && currentStep === step.number);
          const isActive = currentStep === step.number;
          const hasReached = currentStep >= step.number;

          return (
            <div key={step.number} className="flex items-center w-full relative z-10 flex-1">
                {index > 0 && (
                  <div
                    className={cn(
                      "h-1 flex-1 transition-all duration-500",
                      hasReached ? "bg-success" : "bg-border"
                    )}
                  />
                )}
                <div className="flex flex-col items-center mx-2 min-w-[90px]">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                      isCompleted
                        ? "bg-success text-success-foreground"
                        : isActive
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium mt-2 transition-colors text-center",
                      isCompleted
                        ? "text-success"
                        : isActive
                        ? "text-primary"
                        : hasReached
                        ? "text-success"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEP_DEFS.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 transition-all duration-500",
                      currentStep > step.number ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
