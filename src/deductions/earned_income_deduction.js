export class EarnedIncomeDeduction {
    constructor(inputs) {
        this.monthly_job_income = inputs.monthly_job_income;
    }

    calculate() {
        const earned_income_deduction = Math.round(0.2 * this.monthly_job_income);

        const explanation = [
            (
                'Next, we add the earned income deduction. This is equal to 20% of income from jobs or self-employment: '
            ),
            (''),
            (
                `$${this.monthly_job_income} x 0.2 = $${earned_income_deduction} earned income deduction"`
            )
        ];

        return {
            'result': earned_income_deduction,
            'explanation': explanation
        };
    }
}
