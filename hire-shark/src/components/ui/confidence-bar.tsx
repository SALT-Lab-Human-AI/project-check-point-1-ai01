import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ConfidenceBarProps {
  score: number; // Score from 0 to 1
}

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ score }) => {
  const percentage = score * 100;
  let colorClass = "bg-destructive";
  if (percentage > 75) {
    colorClass = "bg-green-500";
  } else if (percentage > 40) {
    colorClass = "bg-yellow-500";
  } else {
    colorClass = "bg-red-500";
  }

  return (
    <ProgressPrimitive.Root
      className="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", colorClass)}
        style={{ transform: `translateX(-${100 - (percentage || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};

export { ConfidenceBar };