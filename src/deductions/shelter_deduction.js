import { FetchMatchShelterDeductions } from '../program_data_api/fetch_max_shelter_deductions.js';

export class ShelterDeduction {
    constructor(inputs) {
        this.adjusted_income = inputs.adjusted_income;
        this.rent_or_mortgage = inputs.rent_or_mortgage;
        this.homeowners_insurance_and_taxes = inputs.homeowners_insurance_and_taxes;
        this.household_includes_elderly_or_disabled = inputs.household_includes_elderly_or_disabled;
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.utility_costs = inputs.utility_costs;
        this.utility_allowance = inputs.utility_allowance;
        this.mandatory_standard_utility_allowances = inputs.mandatory_standard_utility_allowances;
        this.standard_utility_allowances = inputs.standard_utility_allowances;
    }

    calculate() {
        const explanation = [
            'Next, we calculate the Excess Shelter Deduction. To calculate ' +
            'this deduction, we need to find half of the household adjusted income. ' +
            'Adjusted income is equal to gross income, minus all deductions calculated ' +
            'up to this point.'
        ];

        const half_adjusted_income = Math.round(this.adjusted_income / 2);

        const half_adjusted_income_explanation = (
            `For this household, adjusted income is $${this.adjusted_income} ` +
            `and half of adjusted income is $${half_adjusted_income}.`
        );
        explanation.push(half_adjusted_income_explanation);

        const shelter_costs_explanation = (
            'Next, add up shelter costs by adding any costs of rent, mortgage ' +
            'payments, homeowners insurance and property taxes, and utility costs. ' +
            'Let\'s start with everything except utilities:'
        );
        explanation.push(shelter_costs_explanation);

        this.base_shelter_costs = this.rent_or_mortgage + this.homeowners_insurance_and_taxes;

        const shelter_costs_math_explanation = (
            `$${this.rent_or_mortgage} rent or mortgage + ` +
            `$${this.homeowners_insurance_and_taxes} homeowners insurance and taxes = ` +
            `$${this.base_shelter_costs}`
        );
        explanation.push(shelter_costs_math_explanation);

        // # Handle utilities:
        explanation.push('Now let\'s factor in utility costs.');

        const utility_costs = this.calculate_utility_costs();
        const shelter_costs = this.base_shelter_costs + utility_costs['result'];
        explanation.push(utility_costs['explanation']);


        if (half_adjusted_income > shelter_costs) {
            explanation.push(
                'In this case, shelter costs do not exceed half of adjusted income, ' +
                'so the excess shelter deduction does not apply.'
            );

            return {
                'result': 0,
                'explanation': explanation
            };
        }

        const raw_deduction_amount = shelter_costs - half_adjusted_income;

        const excess_shelter_costs_math_intro = (
            'Subtract half of adjusted income from shelter costs to find ' +
            'the base deduction amount:'
        );
        explanation.push(excess_shelter_costs_math_intro);

        const excess_shelter_costs_math_explanation = (
            `$${shelter_costs} shelter costs - $${half_adjusted_income} half of adjusted income = $${raw_deduction_amount} base deduction`
        );
        explanation.push(excess_shelter_costs_math_explanation);

        // If household includes elderly or disabled person, no limit on
        // the amount of the excess shelter deduction.
        if (this.household_includes_elderly_or_disabled) {
            explanation.push(
                `Because the household includes an elderly or disabled household member, there is no limit to the excess shelter deduction amount, so the full deduction amount of $${raw_deduction_amount} applies.`
            );

            return {
                'result': raw_deduction_amount,
                'explanation': explanation,
            };
        }

        // If household does not include an elderly or disabled person,
        // check to see if the deduction amount would be above the limit.
        const maximum_shelter_deduction = new FetchMatchShelterDeductions({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
        }).calculate();

        if (raw_deduction_amount > maximum_shelter_deduction) {
            explanation.push(
                `In this case, the household has a maximum excess shelter deduction of $${maximum_shelter_deduction}, so the maximum deduction amount applies.`
            );

            return {
                'result': maximum_shelter_deduction,
                'explanation': explanation
            };
        }

        // Finally, handle case where household does not include an elderly or
        // disabled person and the deduction amount does not exceed the limit.
        return {
            'result': raw_deduction_amount,
            'explanation': explanation
        };
    }

    calculate_utility_costs() {
        // State with Standard Utility Allowances, no utility allowance claimed
        if (this.utility_allowance === null || this.utility_allowance === 'NONE') {
            // In this case the client has either:
            //
            // * Explicitly told us the end user does not qualify for a
            // standard utility allowance ("NONE"), or,
            //
            // * The client has left the field blank (None); we assume that
            // the end user does not pay for utilities separately and
            // for that reason does not receive a SUA deduction:
            return {
                'result': 0,
                'explanation': (
                    'In this case there is no deduction for utilities, likely ' +
                    'because the household is not billed separately for utilities.'
                )
            };
        }

        // VA is one of a few states that adjust standard utility allowances
        // based on household size
        if (this.state_or_territory === 'VA') {
            if (this.utility_allowance === 'HEATING_AND_COOLING') {
                const heating_cooling_allowances = this.standard_utility_allowances['HEATING_AND_COOLING'];

                if (this.household_size >= 4) {
                    let result = heating_cooling_allowances['four_or_more'];

                    return {
                        'result': result,
                        'explanation': `Virginia has a standard utility allowance of $${result} for households with four or more household members.`,
                    };
                } else {
                    let result = heating_cooling_allowances['below_four'];

                    return {
                        'result': result,
                        'explanation': `Virginia has a standard utility allowance of $${result} for households with less than four household members.`,
                    };
                }
            }
        }

        // State without Standard Utility Allowances
        if (!this.mandatory_standard_utility_allowances) {
            return {
                'result': this.utility_costs,
                'explanation': `In this case, the household has utility costs of $${this.utility_costs}, so total shelter plus utilities costs come to $${this.base_shelter_costs + this.utility_costs}.`
            };
        }

        // State with Standard Utility Allowances, utility allowance claimed
        const utility_allowance_amount = this.standard_utility_allowances[this.utility_allowance];

        return {
            'result': utility_allowance_amount,
            'explanation': `In this case, a standard utility deduction of $${utility_allowance_amount} applies, so total shelter plus utilities costs come to $${utility_allowance_amount + this.base_shelter_costs}.`
        };
    }
}