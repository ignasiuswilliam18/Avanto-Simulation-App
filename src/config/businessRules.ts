export const BUSINESS_RULES = {

  // ======================
  // BUNDLE
  // ======================

  REQUIRE_HP_FOR_BUNDLE: true,

  REQUIRE_IOT_FOR_BUNDLE: true,

  REQUIRE_OPPOCARE_FOR_BUNDLE: true,



  // ======================
  // PRODUCT
  // ======================

  ALLOW_HP_ONLY: true,

  ALLOW_IOT_ONLY: true,



  // ======================
  // DOWN PAYMENT
  // ======================

  ALLOW_MANUAL_DP: true,



  // ======================
  // TENOR
  // ======================

  AVAILABLE_TENORS: [
    3,
    6,
    9,
    12,
  ],



  // ======================
  // INTEREST
  // ======================

  AVAILABLE_INTEREST_RATES: [

    {
      label: "0%",
      value: 0,
    },

    {
      label: "2.7%",
      value: 0.027,
    },

    {
      label: "3.75%",
      value: 0.0375,
    },

    {
      label: "3.99%",
      value: 0.0399,
    },

  ],

};