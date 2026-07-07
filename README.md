# UOI UniTravel — Claims (FNOL) Prototype

A clickable, mobile-responsive React prototype of the UOI travel-insurance
claim submission flow, built from the "Claims - FNOL" Figma design.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui (Radix) + lucide-react.
Client-side only — all data is mocked (`src/data/mock.ts`), no backend.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static production build in dist/
```

## Flow

1. **Login** — Submit Claim gate (Policy No. + NRIC/FIN).
2. **Claims Main** — Policy information + claim history (Add / View / Update).
3. **Claim Wizard** — 3-step accordion with a progress stepper:
   - **Step 1 · Claim Information** — claimants + claim details. Selecting
     **"Loss of Personal Effect"** as the claim type swaps in a Single/Multiple
     item list (add/remove rows, max 10) in place of the medical fields.
   - **Step 2 · Upload Documents** — drag-and-drop / click upload with a
     simulated uploading state, uploaded-file list, preview & remove.
   - **Step 3 · Payment & Disclaimer** — payment details, disclaimer
     (Submit is gated on agreeing), insured & agent contact info.
4. **Completion** — submission confirmation.

## Where things live

- `src/App.tsx` — top-level screen state machine.
- `src/screens/` — one file per screen; the wizard steps are in `src/screens/claim/`.
- `src/screens/claim/formState.ts` — shared wizard form shape + initial values.
- `src/components/ui/` — shadcn/ui primitives.
- `src/index.css` + `tailwind.config.ts` — centralized theme tokens
  (UOI "sure blue" `#005EB8`, neutrals, Noto Sans). Change branding here.
