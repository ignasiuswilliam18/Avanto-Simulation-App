export type TransactionType =
  | "HP_ONLY"
  | "IOT_ONLY"
  | "SMART_BUNDLE"
  | "EMPTY";



export interface ProductSelection {

  hp?: string;

  iot?: string;

  oppoCare?: string;

}




export interface SelectionResult {

  hasHP: boolean;

  hasIot: boolean;

  hasOppoCare: boolean;


  isSingleProduct: boolean;


  isBundle: boolean;


  transactionType: TransactionType;


  displayName: string;

}