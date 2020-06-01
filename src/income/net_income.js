// This is a stub for now.
export class NetIncome {
    constructor(inputs) {
        this.gross_income = inputs.gross_income;
    }

    calculate() {
        const explanation = [];
        const explanation_intro = (
            'To find out if this household is eligible for SNAP and estimate the benefit amount, we start by calculating net income. Net income is equal to total gross monthly income, minus deductions.'
        );
        explanation.push(explanation_intro);

        // Start with gross income
        const income_explanation = (
            `Let's start with total household income. This household's gross income is $${this.gross_income}.`
        );
        explanation.push(income_explanation);

        // Add up deductions before applying excess shelter deduction:
        // const deductions_before_excess_shelter = [
        // ];

        return {
            'result': this.gross_income,
            'explanation': explanation,
        };
    }
}