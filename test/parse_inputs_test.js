import { ParseInputs } from '../src/input_data/parse_input_data.js';
let assert = require('chai').assert;

describe('ParseInputs', () => {
    it('should handle valid inputs', () => {
        const inputs = {
            'state_or_territory': 'IL',
            'monthly_job_income': 0,
            'monthly_non_job_income': 0,
            'household_size': 1,
            'household_includes_elderly_or_disabled': 'false',
            'resources': 0
        };

        const parser = new ParseInputs(inputs);
        parser.parse();

        assert.equal(parser.errors.length, 0);
        assert.equal(parser.inputs, inputs);
    });

    it('should parse numbers passed in as strings', () => {
        const inputs = {
            'state_or_territory': 'IL',
            'monthly_job_income': '0',
            'monthly_non_job_income': '0',
            'household_size': '1',
            'household_includes_elderly_or_disabled': 'false',
            'resources': '0'
        };

        const parser = new ParseInputs(inputs);
        parser.parse();

        assert.equal(parser.errors.length, 0);
        assert.deepEqual(parser.inputs, {
            'court_ordered_child_support_payments': 0,
            'dependent_care_costs': 0,
            'homeowners_insurance_and_taxes': 0,
            'household_includes_elderly_or_disabled': false,
            'household_size': 1,
            'medical_expenses_for_elderly_or_disabled': 0,
            'monthly_job_income': 0,
            'monthly_non_job_income': 0,
            'rent_or_mortgage': 0,
            'resources': 0,
            'state_or_territory': 'IL',
            'utility_costs': 0,
        });
    });
});

