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
}
*/

export const STATE_OPTIONS /*: StateOptions */ = {
    'IL': {
        '2020': {
            'child_support_payments_treatment': 'EXCLUDE',
            'gross_income_limit_factor': 1.65,
            'resource_limit_elderly_or_disabled': null,
            'resource_limit_elderly_or_disabled_income_twice_fpl': 3500,
            'resource_limit_non_elderly_or_disabled': null,
            'standard_medical_deduction': true,
            'standard_medical_deduction_amount': 200,
            'standard_medical_deduction_ceiling': 200,
            'standard_utility_allowances': {
                'BASIC_LIMITED_ALLOWANCE': 328,
                'HEATING_AND_COOLING': 478,
                'PHONE': 30,
                'SINGLE_UTILITY_ALLOWANCE': 74
            },
            'use_emergency_allotment': true,
            'uses_bbce': true,
            'website': 'https://abe.illinois.gov/abe/access/'
        }
    },
    'VA': {
        '2020': {
            'child_support_payments_treatment': 'EXCLUDE', // This matches materials provided by VPLC and VA DSS but not the latest USDA State Options Report
            'standard_medical_deduction': true,
            'standard_medical_deduction_amount': 200,
            'standard_medical_deduction_ceiling': 235,
            'use_emergency_allotment': true,
            'uses_bbce': false,
            'website': 'https://commonhelp.virginia.gov/',
            'standard_utility_allowances': {
                'HEATING_AND_COOLING': {
                    'below_four': 303,
                    'four_or_more': 379,
                },
            },
            'next_steps': [
                {
                    'url': 'https://commonhelp.virginia.gov/',
                    'name': 'Apply online using CommonHelp.',
                },
                {
                    'url': 'https://www.dss.virginia.gov/localagency/index.cgi',
                    'name': 'Apply at a local department near you.',
                }
            ]
        }
    }
};
