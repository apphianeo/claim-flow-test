// UOI wordmark recreation (red "comb" glyph + blue UOI + tagline).
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-1.5 ${className}`}>
      {/* Red comb mark */}
      <svg
        width="26"
        height="30"
        viewBox="0 0 26 30"
        fill="none"
        className="mb-0.5"
        aria-hidden
      >
        {[0, 5, 10, 15, 20].map((x) => (
          <rect key={x} x={x} y="0" width="3" height="30" rx="1.5" fill="#E4002B" />
        ))}
        <rect x="0" y="13" width="23" height="3" fill="#E4002B" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[26px] font-bold leading-none tracking-tight text-primary">
          UOI
        </span>
        <span className="mt-0.5 text-[7px] font-medium uppercase tracking-wide text-primary/80">
          Member of the UOB Group
        </span>
      </div>
    </div>
  );
}
