// UOI logo. The image lives in /public/logo.svg and is served at "/logo.svg".
export function Logo({ className = "h-10" }: { className?: string }) {
  return <img src="/logo.svg" alt="UOI" className={`${className} w-auto`} />;
}
