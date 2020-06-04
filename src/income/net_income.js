import { StandardDeduction } from '../deductions/standard_deduction.js';
import { EarnedIncomeDeduction } from '../deductions/earned_income_deduction.js';
import { DependentCareDeduction } from '../deductions/dependent_care_deduction.js';
import { MedicalExpensesDeduction } from '../deductions/medical_expenses_deduction.js';
import { ShelterDeduction } from '../deductions/shelter_deduction.js';

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
        this.rent_or_mortgage = inputs.rent_or_mortgage;
        this.homeowners_insurance_and_taxes = inputs.homeowners_insurance_and_taxes;
        this.utility_costs = inputs.utility_costs;
        this.utility_allowance = inputs.utility_allowance;
        this.mandatory_standard_utility_allowances = inputs.mandatory_standard_utility_allowances;
        this.standard_utility_allowances = inputs.standard_utility_allowances;
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

        const deductions_before_shelter = [
            earned_income_deduction,
            standard_deduction,
            dependent_care_deduction,
            medical_expenses_deduction,
            // TODO (ARS): Add Child Support Payments Deduction for states that deduct.
        ];

        const total_deductions_before_shelter = deductions_before_shelter.reduce(function(accumulator, current_value) {
            return accumulator + current_value;
        }, 0);

        const adjusted_income_before_excess_shelter = (
            this.gross_income - total_deductions_before_shelter
        );

        const shelter_deduction_result = new ShelterDeduction({
            'adjusted_income': adjusted_income_before_excess_shelter,
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
            'household_includes_elderly_or_disabled': this.household_includes_elderly_or_disabled,
            'rent_or_mortgage': this.rent_or_mortgage,
            'homeowners_insurance_and_taxes': this.homeowners_insurance_and_taxes,
            'utility_costs': this.utility_costs,
            'utility_allowance': this.utility_allowance,
            'mandatory_standard_utility_allowances': this.mandatory_standard_utility_allowances,
            'standard_utility_allowances': this.standard_utility_allowances,
        }).calculate()['result'];

        const total_deductions = total_deductions_before_shelter + shelter_deduction_result;

        const income_minus_deductions = this.gross_income - total_deductions;

        const result = (income_minus_deductions > 0)
            ? income_minus_deductions
            : 0;

        return {
            'name': 'Net Income',
            'result': result,
            'explanation': explanation,
            'sort_order': 1,
        };
    }
}