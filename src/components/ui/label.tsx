import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    required?: boolean;
  }
>(({ className, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      // UOI DS input label: Noto Sans Regular 14px / 1.5, #212121
      "text-sm font-normal leading-normal text-[#212121] peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {required && <span className="mr-0.5 text-destructive">*</span>}
    {children}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
