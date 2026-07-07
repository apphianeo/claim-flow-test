import { Logo } from "./Logo";

/**
 * App shell: white header with UOI logo and a blue accent bar, page body,
 * and the blue copyright footer. Used by every screen.
 */
export function Layout({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b-[3px] border-primary bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] items-center px-4 py-3 sm:px-6">
          <Logo />
        </div>
      </header>

      <main
        className={
          centered
            ? "flex flex-1 items-center justify-center px-4 py-8"
            : "flex-1 px-4 py-6 sm:py-10"
        }
      >
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            Copyright © 2024 United Overseas Insurance Limited Co. Reg. No.
            197100152R.
          </span>
          <span>All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}
