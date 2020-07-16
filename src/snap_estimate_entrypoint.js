// @flow

import { ParseInputs } from './input_data/parse_input_data.js';
import { SnapEstimate } from './snap_estimate.js';

/*::
interface SnapEntrypointInputs {
    state_or_territory: State;
    monthly_job_income: number;
    monthly_non_job_income: number;
    household_size: number;
    household_includes_elderly_or_disabled: boolean;
    resources: number;
    dependent_care_costs?: ?number;
    medical_expenses_for_elderly_or_disabled?: ?number;
    rent_or_mortgage?: ?number;
    homeowners_insurance_and_taxes?: ?number;
    utility_allowance?: ?string;
    court_ordered_child_support_payments?: ?number;
    use_emergency_allotment: boolean;
}
*/

export class SnapEstimateEntrypoint {
    /*::
    raw_inputs: Object;
    */

    constructor(raw_inputs /*: SnapEntrypointInputs */) {
        this.raw_inputs = raw_inputs;
    }

    calculate() {
        const parser = new ParseInputs(this.raw_inputs);
        const inputs_valid = parser.inputs_valid();

        if (!inputs_valid) {
            // Send "invalid inputs" errors to the front-end:
            return {
                'status': 'ERROR',
                'errors': parser.errors
            };
        }

        const inputs = parser.inputs;
        return new SnapEstimate(inputs).calculate();
    }
}