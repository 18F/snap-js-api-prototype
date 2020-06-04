import { ParseInputs } from '../src/input_data/parse_input_data.js';
const assert = require('assert');

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
        assert.equal(parser.inputs, {
            'state_or_territory': 'IL',
            'monthly_job_income': 0,
            'monthly_non_job_income': 0,
            'household_size': 1,
            'household_includes_elderly_or_disabled': 'false',
            'resources': 0,
        });
    });
});

