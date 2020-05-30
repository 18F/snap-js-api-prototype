import { FetchMaxAllotment } from '../program_data_api/fetch_max_allotment.js';

export class BenefitAmountEstimate {
    /*::
    is_eligible: boolean;
    use_emergency_allotment: boolean;
    */

    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.is_eligible = inputs.is_eligible;
        this.net_income = inputs.net_income;
        this.use_emergency_allotment = inputs.use_emergency_allotment;
    }

    calculate() {
        if (!this.is_eligible) {
            return {
                'name': 'Estimated Benefit Calculation',
                'amount': 0,
                'explanation': ['Likely not eligible for SNAP.'],
                'sort_order': 5
            };
        }

        if (this.use_emergency_allotment) {
            return this.calculate_with_emergency_allotment();
        } else {
            return this.calculate_without_emergency_allotment();
        }
    }

    calculate_with_emergency_allotment() {
        return {
            'result': 194
        };
    }

    calculate_without_emergency_allotment() {
        const max_allotment = new FetchMaxAllotment({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
        }).calculate();

        const thirty_percent_net_income = Math.round(this.net_income * 0.3);
        const estimated_benefit = max_allotment - thirty_percent_net_income;

        return {
            'result': estimated_benefit
        };
    }
}