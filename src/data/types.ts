export interface ProductItem {
  model: string;
  price: number;
}

export interface FinancingProvider {
  name: string;
  interestRate: number;
  adminFeeType: "percentage" | "fixed";
  adminFeeValue: number;
}