import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Claim Information", "Upload Documents", "Payment & Disclaimer"];

/** Horizontal 3-step progress indicator. `current` is 0-based. */
export function Stepper({ current }: { current: number }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  (done || active) && "bg-primary text-primary-foreground",
                  !done && !active && "bg-muted text-muted-foreground"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:inline",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px flex-1",
                  done ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
