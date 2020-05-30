// @flow

class BenefitAmountEstimate {
    /*:
    is_eligible: boolean;
    use_emergency_allotment: boolean;
    */

    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.max_allotments = inputs.max_allotments;
        this.min_allotments = inputs.min_allotments;
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
}