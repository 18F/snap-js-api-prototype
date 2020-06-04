import { FetchMaxAllotment } from '../program_data_api/fetch_max_allotment.js';
import { FetchMinAllotment } from '../program_data_api/fetch_min_allotment.js';

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
                'result': 0,
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
        const explanation = [];

        const max_allotment = new FetchMaxAllotment({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
        }).calculate();

        const thirty_percent_net_income = Math.round(this.net_income * 0.3);
        let estimated_benefit = max_allotment - thirty_percent_net_income;

        const min_allotment = new FetchMinAllotment({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
        }).calculate();

        // Check if minimum allotment should be applied.
        if (min_allotment && min_allotment > estimated_benefit) {
            estimated_benefit = min_allotment;

            const min_allotment_applied_explanation = (
                `Since this is below the minimum allotment, apply the minimum allotment amount of $${min_allotment} instead.`
            );
            explanation.push(min_allotment_applied_explanation);
        }

        // Check if estimated benefit below zero.
        if (0 > estimated_benefit) {
            estimated_benefit = 0;

            const zero_benefit_explanation = (
                'In this case, although the household is eligible, because of their income the calcuation results in zero estimated monthly benefit.'
            );
            explanation.push(zero_benefit_explanation);
        }

        return {
            'name': 'Benefit Amount',
            'sort_order': 5,
            'result': estimated_benefit,
            'explanation': explanation,
        };
    }
}