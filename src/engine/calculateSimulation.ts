import type {
  SimulationInput,
  SimulationResult,
  CalculationResult,
} from "../types";

export function calculateSimulation(input: SimulationInput): SimulationResult {
  const { hpPrice = 0, iotPrice = 0, oppoCarePrice = 0, downPayment, tenor, provider, interestRate } = input;

  const singleProductPrice = hpPrice > 0 ? hpPrice : iotPrice;

  const singleProduct = calculateBase({
    price: singleProductPrice,
    downPayment,
    tenor,
    interestRate,
    adminFeeType: provider.adminFeeType,
    adminFeeValue: provider.adminFeeValue,
  });

  const isBundle = hpPrice > 0 && iotPrice > 0 && oppoCarePrice > 0;
  const bundlePrice = isBundle ? hpPrice + iotPrice + oppoCarePrice : 0;

  const bundle = calculateBase({
    price: bundlePrice,
    downPayment,
    tenor,
    interestRate,
    adminFeeType: provider.adminFeeType,
    adminFeeValue: provider.adminFeeValue,
  });

  return { singleProduct, bundle };
}

interface CalculateBaseParams {
  price: number;
  downPayment: number;
  tenor: number;
  interestRate: number;
  adminFeeType: "percentage" | "fixed";
  adminFeeValue: number;
}

function calculateBase({
  price,
  downPayment,
  tenor,
  interestRate,
  adminFeeType,
  adminFeeValue,
}: CalculateBaseParams): CalculationResult {
  const principal = Math.max(price - downPayment, 0);
  const totalLoan = principal;

  let adminFee = 0;
  if (adminFeeType === "percentage") {
    adminFee = principal * adminFeeValue;
  } else {
    adminFee = adminFeeValue;
  }

  const interest = price * interestRate * tenor;
  const totalPayable = principal + adminFee + interest;
  const monthlyInstallment = tenor > 0 ? totalPayable / tenor : 0;

  return {
    totalPrice: Math.round(price),
    downPayment: Math.round(downPayment),
    totalLoan: Math.round(totalLoan),
    principal: Math.round(principal),
    adminFee: Math.round(adminFee),
    interest: Math.round(interest),
    totalPayable: Math.round(totalPayable),
    monthlyInstallment: Math.round(monthlyInstallment),
  };
}