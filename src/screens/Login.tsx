import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Landing / auth gate — "Submit Claim" with Policy No. + NRIC/FIN. */
export function Login({ onSubmit }: { onSubmit: () => void }) {
  const [policyNo, setPolicyNo] = useState("");
  const [nric, setNric] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Layout centered>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm"
      >
        <div className="flex flex-col items-center">
          <Logo />
          <h1 className="mt-5 text-2xl font-bold text-foreground">
            Submit Claim
          </h1>
        </div>

        <div className="mt-7 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="policyNo">Policy No.</Label>
            <Input
              id="policyNo"
              value={policyNo}
              onChange={(e) => setPolicyNo(e.target.value)}
              placeholder="e.g. PNF320104124A23"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nric">NRIC/FIN</Label>
            <Input
              id="nric"
              value={nric}
              onChange={(e) => setNric(e.target.value)}
              placeholder="e.g. S1234567A"
            />
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <Button type="submit" className="px-10">
            Confirm
          </Button>
        </div>
      </form>
    </Layout>
  );
}
