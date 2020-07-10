export class ParseInputs {
    // Detects if input data is valid, returns error messages if not.
    //
    // Also, cleans up input data sent to API:
    //
    // * Converts strings to integers as needed
    // * Sets defaults

    constructor(inputs) {
        this.inputs = inputs;
        this.errors = [];

        // Parse inputs immediately on creating object.
        this.parse();
    }

    // To be called after `parse` is run; parse sets this.errors.
    inputs_valid() {
        return this.errors.length === 0;
    }

    parse() {
        if (!this.inputs) {
            this.errors.append('No input data received.');
            return;
        }

        // Handle required integer fields (household size, income, assets):
        const REQUIRED_NUMBER_INPUTS = [
            'household_size',
            'monthly_job_income',
            'monthly_non_job_income',
            'resources',
        ];

        const REQUIRED_BOOLEAN_INPUTS = [
            'household_includes_elderly_or_disabled'
        ];

        const OPTIONAL_BOOLEAN_INPUTS = [
            'use_emergency_allotment'
        ];

        const OPTIONAL_NUMBER_INPUTS = [
            'dependent_care_costs',
            'medical_expenses_for_elderly_or_disabled',
            'court_ordered_child_support_payments',
            'rent_or_mortgage',
            'homeowners_insurance_and_taxes',
            'utility_costs',
        ];

        const UTILITY_ALLOWANCE_INPUT = 'utility_allowance';

        for (const input_key of REQUIRED_NUMBER_INPUTS) {
            this.handle_required_integer_input(input_key);
        }
        for (const input_key of REQUIRED_BOOLEAN_INPUTS) {
            this.handle_required_bool_input(input_key);
        }
        for (const input_key of OPTIONAL_NUMBER_INPUTS) {
            this.handle_optional_integer_input(input_key);
        }
        for (const input_key of OPTIONAL_BOOLEAN_INPUTS) {
            this.handle_optional_bool_input(input_key);
        }
        this.handle_utility_allowance_input(UTILITY_ALLOWANCE_INPUT);

        return this.inputs;
    }

    handle_required_integer_input(input_key) {
        let input_value = this.inputs[input_key];

        if (input_value === null || input_value === undefined) {
            this.errors.push(`Missing required input: ${input_key}`);
            return false;
        }

        if (typeof input_value === 'string') {
            input_value = input_value.replace(/,/g, '');
        }

        const try_parse_int = parseInt(input_value);

        if (isNaN(try_parse_int)) {
            this.errors.push(`Value for ${input_key} is not a number.`);
            return false;
        }

        this.inputs[input_key] = try_parse_int;
        return true;
    }

    handle_required_bool_input(input_key) {
        const input_value = this.inputs[input_key];

        if (input_value === null || input_value === undefined) {
            this.errors.push(`Missing required input: ${input_key}`);
            return false;
        }

        if (typeof input_value === 'string') {
            this.inputs[input_key] = (input_value === 'true');
            return true;
        }
    }

    handle_optional_bool_input(input_key) {
        // Check if the key exists in the inputs object
        if (!(input_key in this.inputs)) {
            return true;
        }

        const input_value = this.inputs[input_key];

        if ([true, false, null].indexOf(input_value) > -1) {
            return true;
        } else if (typeof input_value === 'string') {
            this.inputs[input_key] = (input_value === 'true');
        } else {
            this.errors.push(`Unexpected value for ${input_key}`);
        }
    }

    handle_utility_allowance_input(input_key) {
        // Check if the key exists in the inputs object
        if (!(input_key in this.inputs)) {
            return true;
        }

        const input_value = this.inputs[input_key];

        // Utility allowance can be blank or '', if the household is in a state
        // that uses raw utility costs instead of standard utility allowances.
        if (input_value === null || input_value === '') {
            this.inputs[input_key] = null;
            return true;
        }

        const UTILITY_ALLOWANCES = [
            'HEATING_AND_COOLING',
            'BASIC_LIMITED_ALLOWANCE',
            'SINGLE_UTILITY_ALLOWANCE',
            'ELECTRICITY',
            'GAS_AND_FUEL',
            'PHONE',
            'SEWAGE',
            'TRASH',
            'WATER',
            // Clients can either explicitly specify that no SUA
            // applies with 'NONE', or leave this optional field
            // blank to the same effect.
            'NONE',
        ];

        if (UTILITY_ALLOWANCES.indexOf(input_value) > -1) {
            return true;
        } else {
            this.errors.push(`Unknown standard utility allowance: ${input_value}`);
            return false;
        }
    }

    handle_optional_integer_input(input_key) {
        // Check if the key exists in the inputs object
        if (!(input_key in this.inputs)) {
            this.inputs[input_key] = 0;
            return true;
        }

        const input_value = this.inputs[input_key];

        if (input_value === null || input_value === '') {
            this.inputs[input_key] = 0;
            return true;
        }

        if (typeof input_value === 'number') {
            return true;
        }

        const try_parse_int = parseInt(input_value);

        if (isNaN(try_parse_int)) {
            this.errors.push(`Value for ${input_key} is not a number.`);
            return false;
        }

        this.inputs[input_key] = try_parse_int;
        return true;
    }
}

