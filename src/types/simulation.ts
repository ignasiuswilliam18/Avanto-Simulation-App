import type { FinancingProvider } from "../data";
import type { CalculationResult } from "./result";

export interface SimulationInput {
  hpPrice?: number;
  iotPrice?: number;
  oppoCarePrice?: number;
  downPayment: number;
  tenor: number;
  provider: FinancingProvider;
  interestRate: number;
}

export interface SimulationResult {
  singleProduct: CalculationResult;
  bundle: CalculationResult;
}