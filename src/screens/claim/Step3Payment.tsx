import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  paymentModes,
  banks,
  disclaimerPoints,
} from "@/data/mock";
import { type ClaimFormState } from "./formState";

interface Props {
  form: ClaimFormState;
  update: (patch: Partial<ClaimFormState>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function Step3Payment({ form, update, onBack, onSubmit }: Props) {
  const canSubmit = form.agreeDisclaimer;

  return (
    <div className="space-y-8">
      {/* Payment information */}
      <section className="space-y-5">
        <h3 className="text-sm font-bold text-foreground">Payment Information</h3>

        <Field label="Payment Mode" required>
          <Select
            value={form.paymentMode}
            onValueChange={(v) => update({ paymentMode: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Please Select" />
            </SelectTrigger>
            <SelectContent>
              {paymentModes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Payment made via Bank Transfer may take an additional 10 working days
            to be processed.
          </p>
        </Field>

        <Field label="Payee Name" required>
          <Input
            value={form.payeeName}
            placeholder="Enter payee name"
            onChange={(e) => update({ payeeName: e.target.value })}
          />
        </Field>

        <Field label="Bank" required>
          <Select value={form.bank} onValueChange={(v) => update({ bank: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Please Select" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Bank Account Number" required>
          <Input
            inputMode="numeric"
            value={form.bankAccount}
            placeholder="Enter account number"
            onChange={(e) => update({ bankAccount: e.target.value })}
          />
        </Field>
      </section>

      {/* Disclaimer */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-foreground">Disclaimer</h3>

        <label className="flex cursor-pointer gap-2.5 text-sm">
          <Checkbox
            className="mt-0.5"
            checked={form.agreeDisclaimer}
            onCheckedChange={(v) => update({ agreeDisclaimer: Boolean(v) })}
          />
          <span>
            By submitting this form, I hereby certify that the information
            provided is true, accurate, and complete to the best of my
            knowledge. I understand and acknowledge that:
          </span>
        </label>

        <ul className="ml-8 space-y-2 text-xs text-muted-foreground">
          {disclaimerPoints.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <label className="flex cursor-pointer gap-2.5 text-sm">
          <Checkbox
            className="mt-0.5"
            checked={form.notifyAgent}
            onCheckedChange={(v) => update({ notifyAgent: Boolean(v) })}
          />
          <span>I approve my agent to be notified of my claim submission.</span>
        </label>
      </section>

      {/* Insured contact */}
      <ContactSection
        title="Insured's Contact Information"
        name={form.insuredName}
        contact={form.insuredContact}
        email={form.insuredEmail}
        nameLabel="Name of Insured"
        onName={(v) => update({ insuredName: v })}
        onContact={(v) => update({ insuredContact: v })}
        onEmail={(v) => update({ insuredEmail: v })}
      />

      {/* Agent contact */}
      <ContactSection
        title="Agent's Contact Information"
        name={form.agentName}
        contact={form.agentContact}
        email={form.agentEmail}
        nameLabel="Name of Agent"
        onName={(v) => update({ agentName: v })}
        onContact={(v) => update({ agentContact: v })}
        onEmail={(v) => update({ agentEmail: v })}
      />

      <div className="flex items-center justify-between pt-1">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={!canSubmit} className="px-8">
          Submit
        </Button>
      </div>
    </div>
  );
}

function ContactSection({
  title,
  nameLabel,
  name,
  contact,
  email,
  onName,
  onContact,
  onEmail,
}: {
  title: string;
  nameLabel: string;
  name: string;
  contact: string;
  email: string;
  onName: (v: string) => void;
  onContact: (v: string) => void;
  onEmail: (v: string) => void;
}) {
  return (
    <section className="space-y-5">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>

      <Field label={nameLabel} required>
        <Input value={name} onChange={(e) => onName(e.target.value)} />
      </Field>

      <Field label="Contact Number" required>
        <div className="flex gap-2">
          <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md border border-input bg-muted/40 text-sm text-muted-foreground">
            +65
          </div>
          <Input value={contact} onChange={(e) => onContact(e.target.value)} />
        </div>
      </Field>

      <Field label="Email Address" required>
        <Input
          type="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
        />
      </Field>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label required={required}>{label}</Label>
      {children}
    </div>
  );
}
