// Shared shape + initial values for the claim wizard.
// Kept separate so step components and the orchestrator agree on the type.

export interface ClaimItem {
  id: string;
  description: string;
  purchaseDate: string;
  currency: string;
  amount: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
}

export interface ClaimFormState {
  // Step 1 — claim information
  selectedClaimants: string[];
  typeOfClaim: string;
  typeOfBenefit: string;
  incidentDate: string;
  natureOfIncident: string;
  claimCurrency: string;
  claimAmount: string;
  existingConditions: "yes" | "no";
  treatmentDate: string;
  // Loss-of-personal-effect branch
  itemMode: "single" | "multiple";
  items: ClaimItem[];

  // Step 2 — documents
  files: UploadedFile[];

  // Step 3 — payment & disclaimer
  paymentMode: string;
  payeeName: string;
  bank: string;
  bankAccount: string;
  agreeDisclaimer: boolean;
  notifyAgent: boolean;
  insuredName: string;
  insuredContact: string;
  insuredEmail: string;
  agentName: string;
  agentContact: string;
  agentEmail: string;
}

let seq = 0;
export const newId = () => `id-${Date.now()}-${seq++}`;

export const emptyItem = (): ClaimItem => ({
  id: newId(),
  description: "",
  purchaseDate: "",
  currency: "SGD",
  amount: "",
});

export const LOSS_OF_PERSONAL_EFFECT = "Loss of Personal Effect";

export const initialFormState: ClaimFormState = {
  selectedClaimants: ["chris", "joseph"],
  typeOfClaim: "",
  typeOfBenefit: "",
  incidentDate: "",
  natureOfIncident: "",
  claimCurrency: "SGD",
  claimAmount: "",
  existingConditions: "yes",
  treatmentDate: "",
  itemMode: "multiple",
  items: [emptyItem()],
  files: [],
  paymentMode: "Bank Transfer",
  payeeName: "",
  bank: "UOB",
  bankAccount: "",
  agreeDisclaimer: false,
  notifyAgent: false,
  insuredName: "Chris Wong",
  insuredContact: "01128421",
  insuredEmail: "chriswong@gmail.com",
  agentName: "Albert Tan",
  agentContact: "9812 32345",
  agentEmail: "alberttan@sia.com",
};
