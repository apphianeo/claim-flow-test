import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Stepper } from "@/components/Stepper";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  initialFormState,
  type ClaimFormState,
} from "./claim/formState";
import { Step1ClaimInfo } from "./claim/Step1ClaimInfo";
import { Step2Upload } from "./claim/Step2Upload";
import { Step3Payment } from "./claim/Step3Payment";

const STEP_TITLES = [
  "Step 1: Claim Information",
  "Step 2: Upload Supporting Documents",
  "Step 3: Payment & Disclaimer",
];

/** Three-step claim wizard driven by an accordion + progress stepper. */
export function ClaimForm({
  onCancel,
  onComplete,
}: {
  onCancel: () => void;
  onComplete: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState("s0");
  const [form, setForm] = useState<ClaimFormState>(initialFormState);

  const update = (patch: Partial<ClaimFormState>) =>
    setForm((f) => ({ ...f, ...patch }));

  const goTo = (step: number) => {
    setCurrent(step);
    setOpen(`s${step}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="mx-auto w-full max-w-3xl">
        <Stepper current={current} />

        <Accordion
          type="single"
          collapsible
          value={open}
          onValueChange={(v) => {
            // Only allow toggling steps that have been reached.
            const idx = Number(v.replace("s", ""));
            if (!v || idx <= current) setOpen(v);
          }}
          className="mt-8 space-y-4"
        >
          {STEP_TITLES.map((title, i) => {
            const done = i < current;
            const reached = i <= current;
            return (
              <AccordionItem key={i} value={`s${i}`}>
                <AccordionTrigger
                  disabled={!reached}
                  className={cn(!reached && "cursor-not-allowed opacity-60")}
                >
                  <span className="flex items-center gap-2">
                    {done && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-foreground">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    )}
                    {title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {i === 0 && (
                    <Step1ClaimInfo
                      form={form}
                      update={update}
                      onProceed={() => goTo(1)}
                    />
                  )}
                  {i === 1 && (
                    <Step2Upload
                      form={form}
                      update={update}
                      onBack={() => goTo(0)}
                      onProceed={() => goTo(2)}
                    />
                  )}
                  {i === 2 && (
                    <Step3Payment
                      form={form}
                      update={update}
                      onBack={() => goTo(1)}
                      onSubmit={onComplete}
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="mt-6">
          <button
            onClick={onCancel}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            ← Back to claim history
          </button>
        </div>
      </div>
    </Layout>
  );
}
