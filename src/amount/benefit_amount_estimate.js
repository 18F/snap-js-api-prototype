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
        this.target_year = inputs.target_year;
    }

    calculate() {
        if (!this.is_eligible) {
            return {
                'name': 'Benefit Amount',
                'result': 0,
                'explanation': ['Likely not eligible for SNAP.'],
                'sort_order': 5,
                'type': 'amount',
            };
        }

        return this.calculate_for_eligible_household();
    }

    calculate_for_eligible_household() {
        const explanation_intro = 'To determine the estimated amount of SNAP benefit, we start with the maximum allotment and then subtract 30% of net income.';
        const explanation = [explanation_intro];

        const max_allotment = new FetchMaxAllotment({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
            'target_year': this.target_year,
        }).calculate();

        const max_allotment_explanation = `The maximum allotment for this household is $${max_allotment}.`;
        explanation.push(max_allotment_explanation);

        const thirty_percent_net_income = Math.round(this.net_income * 0.3);
        let estimated_benefit = max_allotment - thirty_percent_net_income;

        const calculation_explanation = `The household net monthly income is $${this.net_income}. Thirty percent of $${this.net_income} is $${thirty_percent_net_income}. So to calculate the estimated benefit:`;

        explanation.push(calculation_explanation);
        explanation.push('');
        const calcuation_math_explanation = `$${max_allotment} - $${thirty_percent_net_income} = $${estimated_benefit} estimated benefit`;
        explanation.push(calcuation_math_explanation);

        const min_allotment = new FetchMinAllotment({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
            'target_year': this.target_year,
        }).calculate();

        // Check if minimum allotment should be applied.
        if (min_allotment && min_allotment > estimated_benefit) {
            estimated_benefit = min_allotment;

            const min_allotment_explanation = `There is a minimum monthly allotmnet for this household of $${min_allotment}.`;
            explanation.push(min_allotment_explanation);
            const min_allotment_applied_explanation = (
                `Since the calculated benefit amount would be below the minimum allotment, apply the minimum allotment amount of $${min_allotment} instead.`
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

        if (!this.use_emergency_allotment) {
            // Without emergency allotments in effect
            return {
                'name': 'Benefit Amount',
                'sort_order': 5,
                'result': estimated_benefit,
                'explanation': explanation,
                'type': 'amount',
            };
        }

        if (estimated_benefit === max_allotment) {
            // With emergency allotments, household already receiving max benefit:
            explanation.push(
                `This gives us an estimated monthly benefit of $${estimated_benefit}, which is the maximum benefit amount.`
            );
        } else {
            // With emergency allotments, household not already receiving max benefit:
            explanation.push(
                `This gives us an estimated monthly benefit of $${estimated_benefit}. However, because SNAP emergency allotments are active in your state, if approved your benefit could be as much as $${max_allotment} per month.`
            );
        }

        return {
            'name': 'Benefit Amount',
            'sort_order': 5,
            'result': estimated_benefit,
            'emergency_allotment_estimated_benefit': max_allotment,
            'explanation': explanation,
            'type': 'amount'
        };
    }
}