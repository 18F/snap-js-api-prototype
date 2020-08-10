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
        ];

        const REQUIRED_BOOLEAN_INPUTS = [
            'household_includes_elderly_or_disabled'
        ];

        const OPTIONAL_BOOLEAN_INPUTS = [
            'use_emergency_allotment'
        ];

        const OPTIONAL_NUMBER_INPUTS = [
            'resources',
            'dependent_care_costs',
            'medical_expenses_for_elderly_or_disabled',
            'court_ordered_child_support_payments',
            'rent_or_mortgage',
            'homeowners_insurance_and_taxes',
        ];

        for (const input_key of REQUIRED_NUMBER_INPUTS) {
            this.handle_required_number_input(input_key);
        }
        for (const input_key of REQUIRED_BOOLEAN_INPUTS) {
            this.handle_required_bool_input(input_key);
        }
        for (const input_key of OPTIONAL_NUMBER_INPUTS) {
            this.handle_optional_number_input_default_zero(input_key);
        }
        for (const input_key of OPTIONAL_BOOLEAN_INPUTS) {
            this.handle_optional_bool_input(input_key);
        }
        this.handle_utility_allowance_input('utility_allowance');
        this.handle_target_year_input('target_year');

        return this.inputs;
    }

    handle_required_number_input(input_key) {
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
            this.inputs[input_key] = 'NONE';
            return true;
        }

        const input_value = this.inputs[input_key];

        // Convert null, undefined, '', NaN values to 'NONE':
        // https://developer.mozilla.org/en-US/docs/Glossary/Falsy
        if (!input_value) {
            this.inputs[input_key] = 'NONE';
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

    handle_optional_number_input_default_zero(input_key) {
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

    handle_target_year_input(input_key) {
        // Check if the key exists in the inputs object.
        // OK if key is not set; set to null and handle with default in src.
        if (!(input_key in this.inputs)) {
            this.inputs[input_key] = null;
            return true;
        }

        const input_value = this.inputs[input_key];

        // Check if value is undefined, null, or blank.
        // OK if value is undefined, null, or blank; set to null and handle with default in src.
        if (input_value === null || input_value === '' || input_value === undefined) {
            this.inputs[input_key] = null;
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

