export class MedicalExpensesDeduction {
    // Calculates medical expenses deduction for households that include a member
    // who is over 60 years old, blind, or disabled.

    constructor(inputs) {
        this.household_includes_elderly_or_disabled = inputs.household_includes_elderly_or_disabled;
        this.medical_expenses_for_elderly_or_disabled = inputs.medical_expenses_for_elderly_or_disabled;
        this.standard_medical_deduction = inputs.standard_medical_deduction;
        this.standard_medical_deduction_amount = inputs.standard_medical_deduction_amount;
    }

    calculate() {
        const explanation = [
            'Next, deduct monthly medical expenses for elderly or disabled household members beyond $35. '
        ];

        if (this.household_includes_elderly_or_disabled) {
            explanation.push(
                'In this case, there are no elderly or disabled members of the household, so the deduction does not apply. '
            );

            return {
                'result': 0,
                'explanation': explanation,
            };
        }

        if (this.medical_expenses_for_elderly_or_disabled == 0) {
            explanation.push(
                'In this case, there are no monthly medical expenses to deduct. '
            );

            return {
                'result': 0,
                'explanation': explanation,
            };
        }

        if (35 >= self.medical_expenses_for_elderly_or_disabled) {
            explanation.push(
                'In this case, medical expenses are below the $35 monthly threshold for deduction. '
            );

            return {
                'result': 0,
                'explanation': explanation,
            };
        }
    }
}