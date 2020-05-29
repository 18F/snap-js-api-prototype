export const STATE_OPTIONS = {
  "AK": {
    "2020": {
      "child_support_payments_treatment": "DEDUCT",
      "standard_medical_deduction": false,
      "use_emergency_allotment": true,
      "uses_bbce": false
    }
  },
  "CA": {
    "2020": {
      "child_support_payments_treatment": "EXCLUDE",
      "gross_income_limit_factor": 2,
      "resource_limit_elderly_or_disabled": null,
      "resource_limit_elderly_or_disabled_income_twice_fpl": null,
      "resource_limit_non_elderly_or_disabled": null,
      "standard_medical_deduction": true,
      "use_emergency_allotment": true,
      "uses_bbce": true
    }
  },
  "ID": {
    "2020": {
      "child_support_payments_treatment": "DEDUCT",
      "gross_income_limit_factor": 1.3,
      "resource_limit_elderly_or_disabled": 5000,
      "resource_limit_elderly_or_disabled_income_twice_fpl": 5000,
      "resource_limit_non_elderly_or_disabled": 5000,
      "standard_medical_deduction": true,
      "use_emergency_allotment": true,
      "uses_bbce": false
    }
  },
  "IL": {
    "2020": {
      "child_support_payments_treatment": "EXCLUDE",
      "gross_income_limit_factor": 1.65,
      "mandatory_standard_utility_allowances": true,
      "resource_limit_elderly_or_disabled": null,
      "resource_limit_elderly_or_disabled_income_twice_fpl": 3500,
      "resource_limit_non_elderly_or_disabled": null,
      "standard_medical_deduction": true,
      "standard_medical_deduction_amount": 165,
      "standard_utility_allowances": {
        "BASIC_LIMITED_ALLOWANCE": 328,
        "HEATING_AND_COOLING": 478,
        "PHONE": 30,
        "SINGLE_UTILITY_ALLOWANCE": 74
      },
      "use_emergency_allotment": true,
      "uses_bbce": true,
      "website": "https://abe.illinois.gov/abe/access/"
    }
  },
  "MA": {
    "2020": {
      "child_support_payments_treatment": "DEDUCT",
      "gross_income_limit_factor": 2,
      "resource_limit_elderly_or_disabled": null,
      "resource_limit_elderly_or_disabled_income_twice_fpl": 3500,
      "resource_limit_non_elderly_or_disabled": null,
      "standard_medical_deduction": true,
      "use_emergency_allotment": true,
      "uses_bbce": true
    }
  },
  "MI": {
    "2020": {
      "child_support_payments_treatment": "DEDUCT",
      "gross_income_limit_factor": 2,
      "mandatory_standard_utility_allowances": true,
      "resource_limit_elderly_or_disabled": 15000,
      "resource_limit_elderly_or_disabled_income_twice_fpl": 15000,
      "resource_limit_non_elderly_or_disabled": 15000,
      "standard_medical_deduction": false,
      "standard_utility_allowances": {
        "BASIC_LIMITED_ALLOWANCE": 0,
        "ELECTRICITY": 135,
        "GAS_AND_FUEL": 44,
        "HEATING_AND_COOLING": 543,
        "PHONE": 31,
        "SEWAGE": 91,
        "TRASH": 19,
        "WATER": 91
      },
      "use_emergency_allotment": true,
      "uses_bbce": true,
      "website": "https://newmibridges.michigan.gov/"
    }
  },
  "MN": {
    "2020": {
      "child_support_payments_treatment": "DEDUCT",
      "gross_income_limit_factor": 1.65,
      "mandatory_standard_utility_allowances": true,
      "resource_limit_elderly_or_disabled": null,
      "resource_limit_elderly_or_disabled_income_twice_fpl": null,
      "resource_limit_non_elderly_or_disabled": null,
      "standard_medical_deduction": false,
      "standard_utility_allowances": {
        "BASIC_LIMITED_ALLOWANCE": 0,
        "ELECTRICITY": 172,
        "GAS_AND_FUEL": 0,
        "HEATING_AND_COOLING": 556,
        "PHONE": 41,
        "SEWAGE": 0,
        "TRASH": 0,
        "WATER": 0
      },
      "use_emergency_allotment": true,
      "uses_bbce": true,
      "website": "https://edocs.dhs.state.mn.us/lfserver/public/DHS-3529-ENG"
    }
  },
  "UT": {
    "2020": {
      "child_support_payments_treatment": "DEDUCT",
      "mandatory_standard_utility_allowances": true,
      "standard_medical_deduction": false,
      "standard_utility_allowances": {
        "BASIC_LIMITED_ALLOWANCE": 283,
        "ELECTRICITY": 0,
        "GAS_AND_FUEL": 0,
        "HEATING_AND_COOLING": 360,
        "PHONE": 64,
        "SEWAGE": 0,
        "TRASH": 0,
        "WATER": 0
      },
      "use_emergency_allotment": true,
      "uses_bbce": false,
      "website": "https://jobs.utah.gov/assistance/index.html"
    }
  },
  "VA": {
    "2020": {
      "child_support_payments_treatment": "DEDUCT",
      "mandatory_standard_utility_allowances": false,
      "standard_medical_deduction": true,
      "standard_medical_deduction_amount": 140,
      "use_emergency_allotment": true,
      "uses_bbce": false,
      "website": "https://commonhelp.virginia.gov/"
    }
  },
  "VT": {
    "2020": {
      "child_support_payments_treatment": "DEDUCT",
      "gross_income_limit_factor": 1.85,
      "mandatory_standard_utility_allowances": true,
      "resource_limit_elderly_or_disabled": null,
      "resource_limit_elderly_or_disabled_income_twice_fpl": null,
      "resource_limit_non_elderly_or_disabled": null,
      "standard_medical_deduction": false,
      "standard_utility_allowances": {
        "BASIC_LIMITED_ALLOWANCE": 235,
        "ELECTRICITY": 0,
        "GAS_AND_FUEL": 0,
        "HEATING_AND_COOLING": 822,
        "PHONE": 36,
        "SEWAGE": 0,
        "TRASH": 0,
        "WATER": 0
      },
      "use_emergency_allotment": true,
      "uses_bbce": true,
      "website": "https://dcf.vermont.gov/mybenefits"
    }
  }
}
