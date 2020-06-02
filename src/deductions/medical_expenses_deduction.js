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

        if (!this.household_includes_elderly_or_disabled) {
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

        if (35 >= this.medical_expenses_for_elderly_or_disabled) {
            explanation.push(
                'In this case, medical expenses are below the $35 monthly threshold for deduction. '
            );

            return {
                'result': 0,
                'explanation': explanation,
            };
        }

        // State that does not use a Standard Medical Deduction
        if (!this.standard_medical_deduction) {
            const medical_expenses_deduction = this.medical_expenses_for_elderly_or_disabled - 35;
            explanation.push(
                'The medical expenses deduction is equal to monthly medical expenses beyond $35.'
            );

            explanation.push('');

            explanation.push(
                `$${this.medical_expenses_for_elderly_or_disabled} - $35 = $${medical_expenses_deduction} medical expenses deduction`
            );

            return {
                'result': medical_expenses_deduction,
                'explanation': explanation
            };
        }

        // State that uses a Standard Medical Deduction
        const expenses_above_standard = (
            this.medical_expenses_for_elderly_or_disabled > (this.standard_medical_deduction_amount + 35)
        );

        if (expenses_above_standard) {
            const medical_expenses_deduction = this.medical_expenses_for_elderly_or_disabled - 35;

            explanation.push(
                `Medical expenses are greater than the Standard Medical Deduction amount of $${this.standard_medical_deduction_amount}. In this case, the full medical expense amount less $35 can be deducted, which comes to $${medical_expenses_deduction}. `
            );

            return {
                'result': medical_expenses_deduction,
                'explanation': explanation
            };
        } else {
            explanation.push(
                `This state has a Standard Medical Deduction amount of $${this.standard_medical_deduction_amount}. `
            );
            return {
                'result': this.standard_medical_deduction_amount,
                'explanation': explanation
            };
        }
    }
}