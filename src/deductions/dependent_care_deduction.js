export class DependentCareDeduction {
    constructor(inputs) {
        this.dependent_care_costs = inputs.dependent_care_costs;
    }

    calculate() {
        const explanation = [
            `Next, we deduct dependent care costs: $${this.dependent_care_costs}.`
        ];

        return {
            'result': this.dependent_care_costs,
            'explanation': explanation
        };
    }
}
