import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

/** Final confirmation screen after a successful submission. */
export function Completion({
  onReturnHome,
  onNewClaim,
}: {
  onReturnHome: () => void;
  onNewClaim: () => void;
}) {
  return (
    <Layout centered>
      <div className="w-full max-w-lg rounded-xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h1 className="mt-6 text-xl font-bold text-foreground">
          Thank you for your submission.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          We will process your claim submission and reach out within 14 working
          days. For further assistance, please contact us at 6222 7733 during
          business hours.
        </p>
        <div className="mt-7 flex flex-col items-center gap-3">
          <Button className="px-8" onClick={onReturnHome}>
            Return to Home
          </Button>
          <Button variant="link" onClick={onNewClaim}>
            Submit another claim
          </Button>
        </div>
      </div>
    </Layout>
  );
}
