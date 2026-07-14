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



export function calculateSimulation(
  input: SimulationInput
): SimulationResult {


  const {

    hpPrice = 0,

    iotPrice = 0,

    oppoCarePrice = 0,

    downPayment,

    tenor,

    provider,

    interestRate,

  } = input;



  /*
    SINGLE PRODUCT

    HP saja
    atau
    IoT saja

    Prioritas:
    HP > IoT
  */


  const singlePrice =
    hpPrice > 0
      ? hpPrice
      : iotPrice;



  const singleProduct =
    calculateBase({

      price: singlePrice,

      downPayment,

      tenor,

      interestRate,

      adminFeeType:
        provider.adminFeeType,

      adminFeeValue:
        provider.adminFeeValue,

    });





  /*
    SMART BUNDLE

    WAJIB:

    HP
    +
    IoT
    +
    OppoCare

  */


  const isBundle =
    hpPrice > 0 &&
    iotPrice > 0 &&
    oppoCarePrice > 0;



  const bundlePrice =
    isBundle

      ?

      hpPrice +
      iotPrice +
      oppoCarePrice

      :

      0;



  const bundle =
    calculateBase({

      price: bundlePrice,

      downPayment,

      tenor,

      interestRate,

      adminFeeType:
        provider.adminFeeType,

      adminFeeValue:
        provider.adminFeeValue,

    });



  return {

    singleProduct,

    bundle,

  };

}





interface CalculateBaseParams {

  price:number;

  downPayment:number;

  tenor:number;

  interestRate:number;

  adminFeeType:
    "percentage"
    |
    "fixed";

  adminFeeValue:number;

}





function calculateBase({

  price,

  downPayment,

  tenor,

  interestRate,

  adminFeeType,

  adminFeeValue,

}:CalculateBaseParams):CalculationResult {



  const principal =
    Math.max(
      price - downPayment,
      0
    );



  let adminFee = 0;



  if(adminFeeType === "percentage"){

    adminFee =
      principal *
      adminFeeValue;

  }
  else{

    adminFee =
      adminFeeValue;

  }




  /*
    AVANTO BUSINESS RULE

    Bunga dihitung dari harga awal
    sebelum DP

  */


  const interest =
    price *
    interestRate *
    tenor;




  const totalPayable =
    principal +
    adminFee +
    interest;




  const monthlyInstallment =
    tenor > 0
      ?
      totalPayable / tenor
      :
      0;




  return {

    totalPrice:
      Math.round(price),


    downPayment:
      Math.round(downPayment),


    principal:
      Math.round(principal),


    adminFee:
      Math.round(adminFee),


    interest:
      Math.round(interest),


    totalPayable:
      Math.round(totalPayable),


    monthlyInstallment:
      Math.round(monthlyInstallment),

  };

}