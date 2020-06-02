import { StandardDeduction } from '../deductions/standard_deduction.js';
import { EarnedIncomeDeduction } from '../deductions/earned_income_deduction.js';
import { DependentCareDeduction } from '../deductions/dependent_care_deduction.js';
import { MedicalExpensesDeduction } from '../deductions/medical_expenses_deduction.js';

export class NetIncome {
    constructor(inputs) {
        this.household_includes_elderly_or_disabled = inputs.household_includes_elderly_or_disabled;
        this.gross_income = inputs.gross_income;
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.monthly_job_income = inputs.monthly_job_income;
        this.dependent_care_costs = inputs.dependent_care_costs;
        this.medical_expenses_for_elderly_or_disabled = inputs.medical_expenses_for_elderly_or_disabled;
        this.standard_medical_deduction = inputs.standard_medical_deduction;
        this.standard_medical_deduction_amount = inputs.standard_medical_deduction_amount;
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

        const dependent_care_deduction = new DependentCareDeduction({
            'dependent_care_costs': this.dependent_care_costs
        }).calculate().result;

        const medical_expenses_deduction = new MedicalExpensesDeduction({
            'household_includes_elderly_or_disabled': this.household_includes_elderly_or_disabled,
            'medical_expenses_for_elderly_or_disabled': this.medical_expenses_for_elderly_or_disabled,
            'standard_medical_deduction': this.standard_medical_deduction,
            'standard_medical_deduction_amount': this.standard_medical_deduction_amount,
        }).calculate().result;

        const deduction_amounts = [
            earned_income_deduction,
            standard_deduction,
            dependent_care_deduction,
            medical_expenses_deduction,
        ];

        const total_deductions = deduction_amounts.reduce(function(accumulator, current_value) {
            return accumulator + current_value;
        }, 0);

        const income_minus_deductions = this.gross_income - total_deductions;

        const result = (income_minus_deductions > 0)
            ? income_minus_deductions
            : 0;

        return {
            'result': result,
            'explanation': explanation,
        };
    }
}