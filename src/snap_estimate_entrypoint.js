// @flow

import { STATE_OPTIONS } from './program_data/state_options.js';
import { NET_MONTHLY_INCOME_LIMITS } from './program_data/net_monthly_income_limits.js';
import { GrossIncomeTest } from './tests/gross_income_test.js';
import { BenefitAmountEstimate } from './amount/benefit_amount_estimate.js';
import { FetchIncomeLimit } from './program_data_api/fetch_income_limit.js';

const DEFAULT_GROSS_INCOME_LIMIT_FACTOR = 1.3;
const DEFAULT_RESOURCE_LIMIT_ELDERLY_OR_DISABLED = 3500;
const DEFAULT_RESOURCE_LIMIT_NON_ELDERLY_OR_DISABLED = 2250;

/*::
interface SnapEntrypointInputs {
    state_or_territory: string;
    monthly_job_income: number;
    monthly_non_job_income: number;
    household_size: number;
    household_includes_elderly_or_disabled: boolean;
    resources: number;
    use_emergency_allotment: string;
}
*/

class SnapEstimateEntrypoint {
    /*::

    // Inputs
    state_or_territory: string;
    monthly_job_income: number;
    monthly_non_job_income: number;
    household_size: number;
    household_includes_elderly_or_disabled: boolean;
    resources: number;
    use_emergency_allotment: string;

    // State Options
    state_options: Object;
    gross_income_limit_factor: number;
    resource_limit_elderly_or_disabled: number;
    resource_limit_elderly_or_disabled_income_twice_fpl: number;
    resource_limit_non_elderly_or_disabled: number;
    child_support_payments_treatment: string;
    net_monthly_income_limit: number;

    // Outputs
    estimated_benefit: number;
    estimated_eligibility: boolean;
    */

    constructor(inputs /*: SnapEntrypointInputs */) {
        this.state_or_territory = inputs.state_or_territory;
        this.monthly_job_income = inputs.monthly_job_income;
        this.monthly_non_job_income = inputs.monthly_non_job_income;
        this.household_size = inputs.household_size;
        this.household_includes_elderly_or_disabled = inputs.household_includes_elderly_or_disabled;
        this.resources = inputs.resources;
        this.use_emergency_allotment = inputs.use_emergency_allotment;

        this.state_options = STATE_OPTIONS[this.state_or_territory];
        const state_options = this.state_options;
        const uses_bbce = state_options['uses_bbce'];

        this.gross_income_limit_factor = (uses_bbce)
            ? state_options['gross_income_limit_factor']
            : DEFAULT_GROSS_INCOME_LIMIT_FACTOR;

        this.resource_limit_elderly_or_disabled = (uses_bbce)
            ? state_options['resource_limit_elderly_or_disabled']
            : DEFAULT_RESOURCE_LIMIT_ELDERLY_OR_DISABLED;

        this.resource_limit_elderly_or_disabled_income_twice_fpl = (uses_bbce)
            ? state_options['resource_limit_elderly_or_disabled_income_twice_fpl']
            : DEFAULT_RESOURCE_LIMIT_ELDERLY_OR_DISABLED;

        this.resource_limit_non_elderly_or_disabled = (uses_bbce)
            ? state_options['resource_limit_non_elderly_or_disabled']
            : DEFAULT_RESOURCE_LIMIT_NON_ELDERLY_OR_DISABLED;

        this.child_support_payments_treatment = state_options['child_support_payments_treatment'];

        this.net_monthly_income_limit = new FetchIncomeLimit({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
            'income_limit_data': NET_MONTHLY_INCOME_LIMITS,
        }).income_limit_lookup();
    }

    calculate() {
        const gross_income_test = new GrossIncomeTest({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
            'household_includes_elderly_or_disabled': this.household_includes_elderly_or_disabled,
            'resources': this.resources,
            'gross_income': this.gross_income(),
            'net_monthly_income_limit': this.net_monthly_income_limit,
            'gross_income_limit_factor': this.gross_income_limit_factor,
        });

        const gross_income_calculation = gross_income_test.calculate();
        this.estimated_eligibility = gross_income_calculation.result;

        const benefit_amount_estimate = new BenefitAmountEstimate({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
            'is_eligible': this.estimated_eligibility,
            'net_income': this.net_income(),
            'use_emergency_allotment': false,
        });

        const benefit_amount_calculation = benefit_amount_estimate.calculate();

        this.estimated_benefit = benefit_amount_calculation.result;
    }

    gross_income() {
        return this.monthly_job_income + this.monthly_non_job_income;
    }

    net_income() {
        return 0; // stub
    }
}

export { SnapEstimateEntrypoint };