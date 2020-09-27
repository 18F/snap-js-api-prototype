// @flow strict

/*::
type StateOptions = {
    [State]: StateYearOption;
}

type StateYearOption = {
    '2020': IndividualStateOption;
}

type IndividualStateOption = {
    uses_bbce: boolean;
    child_support_payments_treatment: string;
    gross_income_limit_factor?: number;
    resource_limit_elderly_or_disabled?: ?number;
    resource_limit_elderly_or_disabled_income_twice_fpl?: ?number;
    resource_limit_non_elderly_or_disabled?: ?number;
    child_support_payments_treatment: string;
    standard_medical_deduction: boolean;
    standard_medical_deduction_amount: number;
    standard_medical_deduction_ceiling: number;
    standard_utility_allowances: {};
}
*/

// DATA SOURCES:
//
// "Broad-Based Community Eligibility", USDA, last updated December 2019:
// https://fns-prod.azureedge.net/sites/default/files/resource-files/BBCE2019%28December%29.pdf
//
// "State Options Report", USDA, Options as of October 1, 2017:
//
// https://fns-prod.azureedge.net/sites/default/files/snap/14-State-Options.pdf
//
// "Standard Utility Allowances", USDA:
//
// https://www.fns.usda.gov/snap/eligibility/deduction/standard-utility-allowances

export const STATE_OPTIONS /*: StateOptions */ = {
    'IL': {
        '2020': {
            // Broad-based categorical eligibility, resource and income limits:
            'uses_bbce': true,
            'resource_limit_elderly_or_disabled': null,
            'resource_limit_elderly_or_disabled_income_twice_fpl': 3500,
            'resource_limit_non_elderly_or_disabled': null,
            'gross_income_limit_factor': 1.65,
            // State deduction options:
            'child_support_payments_treatment': 'EXCLUDE',
            'standard_medical_deduction': true,
            'standard_medical_deduction_amount': 200,
            'standard_medical_deduction_ceiling': 200,
            'standard_utility_allowances': {
                'BASIC_LIMITED_ALLOWANCE': 328,
                'HEATING_AND_COOLING': 478,
                'PHONE': 30,
                'SINGLE_UTILITY_ALLOWANCE': 74
            }
        }
    },
    'VA': {
        '2020': {
            // Broad-based categorical eligibility:
            'uses_bbce': false,
            // State deduction options:
            'child_support_payments_treatment': 'EXCLUDE', // This matches materials provided by VPLC and VA DSS but not the latest USDA State Options Report
            'standard_medical_deduction': true,
            'standard_medical_deduction_amount': 200,
            'standard_medical_deduction_ceiling': 235,
            'standard_utility_allowances': {
                'HEATING_AND_COOLING': {
                    'below_four': 303,
                    'four_or_more': 379,
                }
            }
        },
        '2021': {
            // Same as 2020:
            'uses_bbce': false,
            'child_support_payments_treatment': 'EXCLUDE',
            'standard_medical_deduction': true,
            'standard_medical_deduction_amount': 200,
            'standard_medical_deduction_ceiling': 235,
            'standard_utility_allowances': {
                'HEATING_AND_COOLING': {
                    'below_four': 303,
                    'four_or_more': 379,
                }
            }
        }
    }
};
