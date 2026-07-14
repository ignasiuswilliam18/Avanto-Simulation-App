import {
  ProductSelection,
  SelectionResult,
  TransactionType,
} from "../types";


export function useProductSelection(
  selection: ProductSelection
): SelectionResult {


  const hasHP =
    Boolean(selection.hp);


  const hasIot =
    Boolean(selection.iot);


  const hasOppoCare =
    Boolean(selection.oppoCare);



  let transactionType: TransactionType = "EMPTY";


  let displayName = "";



  // ======================
  // SMART BUNDLE
  // HP + IOT + OPPOCARE
  // ======================

  if (
    hasHP &&
    hasIot &&
    hasOppoCare
  ) {

    transactionType = "SMART_BUNDLE";


    displayName =
      `${selection.hp} + ${selection.iot} + ${selection.oppoCare}`;

  }



  // ======================
  // HP ONLY
  // ======================

  else if (hasHP) {

    transactionType = "HP_ONLY";


    displayName =
      selection.hp ?? "";

  }



  // ======================
  // IOT ONLY
  // ======================

  else if (hasIot) {

    transactionType = "IOT_ONLY";


    displayName =
      selection.iot ?? "";

  }



  return {

    hasHP,

    hasIot,

    hasOppoCare,


    isSingleProduct:
      transactionType === "HP_ONLY" ||
      transactionType === "IOT_ONLY",


    isBundle:
      transactionType === "SMART_BUNDLE",


    transactionType,


    displayName,

  };

}