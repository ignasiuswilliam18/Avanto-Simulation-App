import type { FinancingProvider } from "../data";


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




export interface CalculationResult {

  totalPrice: number;


  downPayment: number;


  principal: number;


  adminFee: number;


  interest: number;


  totalPayable: number;


  monthlyInstallment: number;

}