import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateField } from "@/components/ui/date-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { claimants, claimTypes, benefitTypes, currencies } from "@/data/mock";
import {
  type ClaimFormState,
  type ClaimItem,
  emptyItem,
  LOSS_OF_PERSONAL_EFFECT,
} from "./formState";

interface Props {
  form: ClaimFormState;
  update: (patch: Partial<ClaimFormState>) => void;
  onProceed: () => void;
}

const MAX_ITEMS = 10;

export function Step1ClaimInfo({ form, update, onProceed }: Props) {
  const isPersonalEffect = form.typeOfClaim === LOSS_OF_PERSONAL_EFFECT;

  const toggleClaimant = (id: string) => {
    const next = form.selectedClaimants.includes(id)
      ? form.selectedClaimants.filter((c) => c !== id)
      : [...form.selectedClaimants, id];
    update({ selectedClaimants: next });
  };

  const setItem = (id: string, patch: Partial<ClaimItem>) =>
    update({
      items: form.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    });

  const addItem = () => {
    if (form.items.length < MAX_ITEMS)
      update({ items: [...form.items, emptyItem()] });
  };

  const removeItem = (id: string) =>
    update({ items: form.items.filter((it) => it.id !== id) });

  return (
    <div className="flex flex-col gap-8">
      {/* Claimant profiles */}
      <section className="flex flex-col gap-6">
        <h3 className="text-base font-semibold text-[#212121]">
          Claimant Profile(s)
        </h3>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[#212121]">
            <span className="mr-1 text-destructive">*</span>Select Claimant(s)
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {claimants.map((c) => (
              <label
                key={c.id}
                className="flex cursor-pointer items-center gap-3 text-base text-[#212121]"
              >
                <Checkbox
                  checked={form.selectedClaimants.includes(c.id)}
                  onCheckedChange={() => toggleClaimant(c.id)}
                />
                <span>
                  {c.name} ({c.role})
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-black/[0.09]" />

      {/* Claim details */}
      <section className="flex flex-col gap-6">
        <h3 className="text-base font-semibold text-[#212121]">Claim Details</h3>

        <Field label="Type of Claim" required>
          <Select
            value={form.typeOfClaim}
            onValueChange={(v) => update({ typeOfClaim: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Please Select" />
            </SelectTrigger>
            <SelectContent>
              {claimTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Type of Benefit" required>
          <Select
            value={form.typeOfBenefit}
            onValueChange={(v) => update({ typeOfBenefit: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Please Select" />
            </SelectTrigger>
            <SelectContent>
              {benefitTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {isPersonalEffect ? (
          <PersonalEffectSection
            form={form}
            update={update}
            setItem={setItem}
            addItem={addItem}
            removeItem={removeItem}
          />
        ) : (
          <StandardClaimSection form={form} update={update} />
        )}
      </section>

      <div className="flex justify-end">
        <Button onClick={onProceed}>Save &amp; Proceed</Button>
      </div>
    </div>
  );
}

/* ---- Standard (medical) claim fields ---- */
function StandardClaimSection({
  form,
  update,
}: {
  form: ClaimFormState;
  update: (patch: Partial<ClaimFormState>) => void;
}) {
  return (
    <>
      <Field label="Incident Date" required>
        <DateField
          value={form.incidentDate}
          placeholder="Select Incident Date"
          onChange={(v) => update({ incidentDate: v })}
        />
      </Field>

      <Field label="Nature of Incident" required>
        <Textarea
          placeholder="Please describe what happened"
          value={form.natureOfIncident}
          onChange={(e) => update({ natureOfIncident: e.target.value })}
        />
      </Field>

      <Field label="Claim Amount" required>
        <AmountInput
          currency={form.claimCurrency}
          amount={form.claimAmount}
          onCurrency={(v) => update({ claimCurrency: v })}
          onAmount={(v) => update({ claimAmount: v })}
        />
      </Field>

      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#212121]">
          <span className="mr-1 text-destructive">*</span>Do you have any
          existing medical conditions?
        </p>
        <RadioGroup
          className="gap-3"
          value={form.existingConditions}
          onValueChange={(v) =>
            update({ existingConditions: v as "yes" | "no" })
          }
        >
          <label className="flex cursor-pointer items-center gap-3 text-base text-[#212121]">
            <RadioGroupItem value="yes" /> Yes
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-base text-[#212121]">
            <RadioGroupItem value="no" /> No
          </label>
        </RadioGroup>
      </div>

      <Field label="Treatment Date" required>
        <DateField
          value={form.treatmentDate}
          placeholder="Select Treatment Date"
          onChange={(v) => update({ treatmentDate: v })}
        />
      </Field>
    </>
  );
}

/* ---- Loss of personal effect: single/multiple + item list ---- */
function PersonalEffectSection({
  form,
  update,
  setItem,
  addItem,
  removeItem,
}: {
  form: ClaimFormState;
  update: (patch: Partial<ClaimFormState>) => void;
  setItem: (id: string, patch: Partial<ClaimItem>) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
}) {
  const rows = form.itemMode === "single" ? form.items.slice(0, 1) : form.items;

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#212121]">
          <span className="mr-1 text-destructive">*</span>Do you have single or
          multiple item(s) to be claimed?
        </p>
        <RadioGroup
          className="gap-3"
          value={form.itemMode}
          onValueChange={(v) => update({ itemMode: v as "single" | "multiple" })}
        >
          <label className="flex cursor-pointer items-center gap-3 text-base text-[#212121]">
            <RadioGroupItem value="single" /> Single
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-base text-[#212121]">
            <RadioGroupItem value="multiple" /> Multiple
          </label>
        </RadioGroup>
      </div>

      <div>
        <p className="mb-3 text-base font-semibold text-[#212121]">
          Item List{" "}
          <span className="font-normal text-muted-foreground">(max 10)</span>
        </p>

        {/* Column headers — desktop only */}
        <div className="mb-2 hidden grid-cols-[1fr_170px_190px_32px] gap-3 text-sm sm:grid">
          <span>
            <span className="mr-1 text-destructive">*</span>Item Description
          </span>
          <span>
            <span className="mr-1 text-destructive">*</span>Purchase Date
          </span>
          <span>
            <span className="mr-1 text-destructive">*</span>Purchase Amount
          </span>
          <span />
        </div>

        <div className="space-y-3 sm:space-y-2">
          {rows.map((it) => (
            <div
              key={it.id}
              className="grid grid-cols-1 gap-2 rounded-md border border-black/[0.09] p-3 sm:grid-cols-[1fr_170px_190px_32px] sm:items-center sm:gap-3 sm:border-0 sm:p-0"
            >
              <div>
                <span className="mb-1 block text-sm sm:hidden">
                  Item Description
                </span>
                <Input
                  placeholder="Describe item"
                  value={it.description}
                  onChange={(e) =>
                    setItem(it.id, { description: e.target.value })
                  }
                />
              </div>
              <div>
                <span className="mb-1 block text-sm sm:hidden">
                  Purchase Date
                </span>
                <DateField
                  value={it.purchaseDate}
                  placeholder="Select Purchase Date"
                  onChange={(v) => setItem(it.id, { purchaseDate: v })}
                />
              </div>
              <div>
                <span className="mb-1 block text-sm sm:hidden">
                  Purchase Amount
                </span>
                <AmountInput
                  currency={it.currency}
                  amount={it.amount}
                  onCurrency={(v) => setItem(it.id, { currency: v })}
                  onAmount={(v) => setItem(it.id, { amount: v })}
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(it.id)}
                disabled={rows.length === 1}
                className="flex h-9 items-center justify-center text-muted-foreground disabled:opacity-30 sm:h-12 sm:w-8"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {form.itemMode === "multiple" && (
          <button
            type="button"
            onClick={addItem}
            disabled={form.items.length >= MAX_ITEMS}
            className="mt-3 flex items-center gap-1 text-sm text-muted-foreground disabled:opacity-40"
          >
            Add Item <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
    </>
  );
}

/* ---- Small shared building blocks ---- */
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
    <div className="flex flex-col gap-3">
      <Label required={required}>{label}</Label>
      {children}
    </div>
  );
}

function AmountInput({
  currency,
  amount,
  onCurrency,
  onAmount,
}: {
  currency: string;
  amount: string;
  onCurrency: (v: string) => void;
  onAmount: (v: string) => void;
}) {
  return (
    <div className="flex gap-3">
      <Select value={currency} onValueChange={onCurrency}>
        <SelectTrigger className="w-[92px] shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        inputMode="decimal"
        placeholder="Input Amount"
        value={amount}
        onChange={(e) => onAmount(e.target.value)}
      />
    </div>
  );
}
