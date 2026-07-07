import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/** Textarea matching the UOI Design System (160px tall, same field styling). */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[160px] w-full rounded-lg border border-black/[0.09] bg-white px-4 py-3 text-base leading-normal text-[#212121] transition-colors",
          "placeholder:text-[#949494]",
          "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(0,94,184,0.2)] focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:text-[#BDBDBD]",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
