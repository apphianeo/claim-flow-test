import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Text input matching the UOI Design System input field:
 * 48px tall, 8px radius, 16px Noto Sans, rgba(0,0,0,0.09) border,
 * #949494 placeholder, focus = solid #005EB8 border + 3px rgba(0,94,184,0.2)
 * ring, disabled #F5F5F5 / #BDBDBD, error (aria-invalid) #DC2626.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-black/[0.09] bg-white px-4 py-3 text-base leading-normal text-[#212121] transition-colors",
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
Input.displayName = "Input";

export { Input };
