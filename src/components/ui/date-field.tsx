import * as React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateFieldProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}

/**
 * Date field matching the design: shows the placeholder text (e.g. "Select
 * Incident Date") with a calendar icon while empty, and becomes a native date
 * picker on focus. Same field styling as Input.
 */
export function DateField({
  value,
  onChange,
  placeholder,
  className,
}: DateFieldProps) {
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cn("relative w-full", className)}>
      <input
        ref={ref}
        type={value ? "date" : "text"}
        value={value}
        placeholder={placeholder}
        onFocus={(e) => (e.currentTarget.type = "date")}
        onBlur={(e) => {
          if (!e.currentTarget.value) e.currentTarget.type = "text";
        }}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "flex h-12 w-full rounded-lg border border-black/[0.09] bg-white px-4 py-3 pr-12 text-base leading-normal text-[#212121] transition-colors",
          "placeholder:text-[#949494]",
          "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(0,94,184,0.2)] focus-visible:ring-offset-0",
          // Make the native picker indicator invisible but fill the right edge
          // so clicking near the calendar icon opens the picker.
          "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-12 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
        )}
      />
      <Calendar
        className="pointer-events-none absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[#949494]"
        strokeWidth={1.5}
      />
    </div>
  );
}
