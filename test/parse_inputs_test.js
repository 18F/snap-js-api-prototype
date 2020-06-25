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

        assert.equal(parser.inputs_valid(), true);
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

        assert.equal(parser.inputs_valid(), true);
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

    it('parses decimal values into integer dollar amounts (for required integers)', () => {
        const inputs = {
            'state_or_territory': 'IL',
            'monthly_job_income': '101.90',
            'monthly_non_job_income': '101.10',
            'household_size': '1',
            'household_includes_elderly_or_disabled': 'false',
            'resources': '1001.50'
        };

        const parser = new ParseInputs(inputs);

        assert.equal(parser.inputs_valid(), true);
        assert.deepEqual(parser.inputs, {
            'court_ordered_child_support_payments': 0,
            'dependent_care_costs': 0,
            'homeowners_insurance_and_taxes': 0,
            'household_includes_elderly_or_disabled': false,
            'household_size': 1,
            'medical_expenses_for_elderly_or_disabled': 0,
            'monthly_job_income': 101,
            'monthly_non_job_income': 101,
            'rent_or_mortgage': 0,
            'resources': 1001,
            'state_or_territory': 'IL',
            'utility_costs': 0,
        });
    });


    it('parses decimal values into integer dollar amounts (for optional integers)', () => {
        const inputs = {
            'state_or_territory': 'IL',
            'monthly_job_income': '101.90',
            'monthly_non_job_income': '101.10',
            'household_size': '1',
            'household_includes_elderly_or_disabled': 'false',
            'resources': '1001.50',
            'medical_expenses_for_elderly_or_disabled': '108.80'
        };

        const parser = new ParseInputs(inputs);

        assert.equal(parser.inputs_valid(), true);
        assert.deepEqual(parser.inputs, {
            'court_ordered_child_support_payments': 0,
            'dependent_care_costs': 0,
            'homeowners_insurance_and_taxes': 0,
            'household_includes_elderly_or_disabled': false,
            'household_size': 1,
            'medical_expenses_for_elderly_or_disabled': 108,
            'monthly_job_income': 101,
            'monthly_non_job_income': 101,
            'rent_or_mortgage': 0,
            'resources': 1001,
            'state_or_territory': 'IL',
            'utility_costs': 0,
        });
    });

    it('should parse string `true` to a boolean for a boolean field', () => {
        const inputs = {
            'state_or_territory': 'IL',
            'monthly_job_income': '0',
            'monthly_non_job_income': '0',
            'household_size': '1',
            'household_includes_elderly_or_disabled': 'true',
            'resources': '0'
        };

        const parser = new ParseInputs(inputs);

        assert.equal(parser.inputs_valid(), true);
        assert.deepEqual(parser.inputs, {
            'court_ordered_child_support_payments': 0,
            'dependent_care_costs': 0,
            'homeowners_insurance_and_taxes': 0,
            'household_includes_elderly_or_disabled': true,
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

    it('should add an error to the errors array if a required integer is missing', () => {
        const inputs = {
            'state_or_territory': 'IL',
            'monthly_non_job_income': '0',
            'household_size': '1',
            'household_includes_elderly_or_disabled': 'true',
            'resources': '0'
        };

        const parser = new ParseInputs(inputs);

        assert.equal(parser.inputs_valid(), false);
        assert.deepEqual(parser.errors, [
            'Missing required input: monthly_job_income'
        ]);
    });

    it('should add an error to the errors array if a required boolean is missing', () => {
        const inputs = {
            'state_or_territory': 'IL',
            'monthly_non_job_income': '0',
            'monthly_job_income': '0',
            'household_size': '1',
            'resources': '0'
        };

        const parser = new ParseInputs(inputs);

        assert.equal(parser.inputs_valid(), false);
        assert.deepEqual(parser.errors, [
            'Missing required input: household_includes_elderly_or_disabled'
        ]);
    });


    it('should add no errors on valid utility allowance value', () => {
        const inputs = {
            'state_or_territory': 'IL',
            'household_includes_elderly_or_disabled': 'false',
            'monthly_non_job_income': '0',
            'monthly_job_income': '0',
            'household_size': '1',
            'resources': '0',
            'utility_allowance': 'HEATING_AND_COOLING',
        };

        const parser = new ParseInputs(inputs);

        assert.equal(parser.inputs_valid(), true);
    });


    it('should add an errors on invalid utility allowance value', () => {
        const inputs = {
            'state_or_territory': 'IL',
            'household_includes_elderly_or_disabled': 'false',
            'monthly_non_job_income': '0',
            'monthly_job_income': '0',
            'household_size': '1',
            'resources': '0',
            'utility_allowance': '7',
        };

        const parser = new ParseInputs(inputs);

        assert.equal(parser.inputs_valid(), false);
        assert.deepEqual(parser.errors, [
            'Unknown standard utility allowance: 7'
        ]);
    });



});

