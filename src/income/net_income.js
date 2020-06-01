import { StandardDeduction } from '../deductions/standard_deduction.js';
import { EarnedIncomeDeduction } from '../deductions/earned_income_deduction.js';

export class NetIncome {
    constructor(inputs) {
        this.gross_income = inputs.gross_income;
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.monthly_job_income = inputs.monthly_job_income;
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

        // Add up deductions
        const standard_deduction = new StandardDeduction({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
        }).calculate().result;

        const earned_income_deduction = new EarnedIncomeDeduction({
            'monthly_job_income': this.monthly_job_income
        }).calculate().result;

        const income_minus_deductions = (
            this.gross_income - earned_income_deduction - standard_deduction
        );

        const result = (income_minus_deductions > 0)
            ? income_minus_deductions
            : 0;

        return {
            'result': result,
            'explanation': explanation,
        };
    }
}