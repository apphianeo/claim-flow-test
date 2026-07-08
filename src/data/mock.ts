// Hardcoded mock data for the UOI UniTravel claims prototype.
// Change sample content here — this file is the single edit point for data.

export interface PolicyInfo {
  productName: string;
  policyNo: string;
  plan: string;
  tripType: string;
  groupType: string;
  destination: string;
  effective: string;
  expiry: string;
}

export const policy: PolicyInfo = {
  productName: "InsureTravel (Annual Trip)",
  policyNo: "PNF320104124A23",
  plan: "Plus",
  tripType: "Single Trip",
  groupType: "Individual",
  destination: "Area 1",
  effective: "25/11/2024, 09:32:42",
  expiry: "30/11/2024, 23:59:59",
};

export type ClaimStatus = "Completed" | "Draft";

export interface ClaimRecord {
  id: string;
  benefit: string;
  reference: string;
  creationDate: string;
  submissionDate: string;
  status: ClaimStatus;
}

export const claimHistory: ClaimRecord[] = [
  {
    id: "c1",
    benefit: "Trip Curtailment",
    reference: "P15XXXYYDD",
    creationDate: "26/07/2025",
    submissionDate: "26/07/2025",
    status: "Completed",
  },
  {
    id: "c2",
    benefit: "Medical and Accidental Dental Expenses Incurred Overseas",
    reference: "P15XXXYYDD",
    creationDate: "26/07/2025",
    submissionDate: "26/07/2025",
    status: "Draft",
  },
  {
    id: "c3",
    benefit: "Trip Curtailment",
    reference: "P15XXXYYDD",
    creationDate: "26/07/2025",
    submissionDate: "26/07/2025",
    status: "Completed",
  },
  {
    id: "c4",
    benefit: "Medical and Accidental Dental Expenses Incurred Overseas",
    reference: "P15XXXYYDD",
    creationDate: "26/07/2025",
    submissionDate: "26/07/2025",
    status: "Draft",
  },
  {
    id: "c5",
    benefit: "Trip Curtailment",
    reference: "P15XXXYYDD",
    creationDate: "26/07/2025",
    submissionDate: "26/07/2025",
    status: "Completed",
  },
  {
    id: "c6",
    benefit: "Medical and Accidental Dental Expenses Incurred Overseas",
    reference: "P15XXXYYDD",
    creationDate: "26/07/2025",
    submissionDate: "26/07/2025",
    status: "Draft",
  },
];

export interface Claimant {
  id: string;
  name: string;
  role: string;
}

export const claimants: Claimant[] = [
  { id: "chris", name: "Chris Wong", role: "Policyholder" },
  { id: "joseph", name: "Joseph Wong", role: "Insured Adult" },
  { id: "child1", name: "Unnamed Child", role: "Insured Child 1" },
  { id: "child2", name: "Unnamed Child", role: "Insured Child 2" },
];

export const claimTypes = [
  "Medical Expenses",
  "Trip Curtailment",
  "Trip Cancellation",
  "Loss of Personal Effect",
  "Travel Delay",
  "Baggage Delay",
];

export const benefitTypes = [
  "Medical and Accidental Dental Expenses Incurred Overseas",
  "Trip Curtailment",
  "Loss of Personal Effect",
  "Emergency Medical Evacuation",
  "Personal Accident",
];

export const currencies = ["SGD", "USD", "EUR", "MYR", "GBP"];

export const requiredDocuments = [
  "Medical Report and/or Hospital Discharge Summary showing nature and/or diagnosis of injury/ sickness",
  "Original Medical Bills/ Receipts for the full amount of the claim",
  "Police Report (for accident-related cases)",
  "Death Certificate, Burial/ Cremation Permit (if death occurred) and bill incurred for burial in the locality",
  "Child's birth certificate(s)",
  "Bills/Receipts for additional expenses incurred (for compassionate visit and child help claim)",
];

export const paymentModes = ["Bank Transfer", "Cheque", "PayNow"];
export const banks = ["UOB", "DBS", "OCBC", "Standard Chartered", "Maybank"];

export const disclaimerPoints = [
  "Any false, incomplete, or misleading information may result in the denial of my claim and could be subject to penalties under applicable laws.",
  "Submission of this form does not guarantee approval or payment of a claim and that all claims are subject to review, verification, and the terms and conditions of the applicable insurance policy.",
  "United Overseas Insurance and its representatives may obtain and share any information necessary to process this claim, including medical records, repair estimates, or other relevant documents, in accordance with applicable privacy laws and regulations.",
  "I may be contacted for additional information, and that failure to provide requested documentation may result in delays or denial of my claim.",
];
