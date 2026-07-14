import type { FinancingProvider } from "./types";

export const FINANCING_PROVIDERS: FinancingProvider[] = [
  {
    name: "Avanto By Yessscredit",
    interestRate: 0.0375,
    adminFeeType: "fixed",
    adminFeeValue: 60000,
  },
  {
    name: "Avanto by Kredivo",
    interestRate: 0.0375,
    adminFeeType: "percentage",
    adminFeeValue: 0.02,
  },
];