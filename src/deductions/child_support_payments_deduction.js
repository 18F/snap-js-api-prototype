export class ChildSupportPaymentsDeduction {
    constructor(inputs) {
        this.child_support_payments_treatment = inputs.child_support_payments_treatment;
        this.court_ordered_child_support_payments = inputs.court_ordered_child_support_payments;
    }

    calculate() {
        if (this.child_support_payments_treatment !== 'DEDUCT') {
            return {
                'result': 0,
                'explanation': [
                    'Court-ordered child support payments are not deductible in this state, (they are excluded from gross income instead).'
                ]
            };
        }

        if (this.court_ordered_child_support_payments === 0) {
            return {
                'result': 0,
                'explanation': [
                    'This household does not make monthly court-ordered ' +
                    'child support payments, so the child-support payment ' +
                    'deduction does not apply.'
                ]
            };
        }

        return {
            'result': this.court_ordered_child_support_payments,
            'explanation': [
                `Next, we deduct the monthly cost of court-ordered child support payments: $${this.court_ordered_child_support_payments}.`
            ]
        };
    }

}
