import { STANDARD_DEDUCTIONS } from '../program_data/standard_deductions.js';

export class FetchStandardDeductions {
    // Internal API for fetching FNS data about standard deduction amounts.
    // and fiscal year.

    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
    }

    state_lookup_key() {
        const NON_DEFAULT_STATES_TERRITORIES = [
            'AK',
            'HI',
            'IL',
            'GUAM',
            'VIRGIN_ISLANDS',
        ];

        return (NON_DEFAULT_STATES_TERRITORIES.indexOf(this.state_or_territory) > -1)
            ? this.state_or_territory
            : 'DEFAULT';
    }

    calculate() {
        const state_lookup_key = this.state_lookup_key();
        const scale = STANDARD_DEDUCTIONS[state_lookup_key][2020];

        if (0 < this.household_size && this.household_size < 7) {
            return scale[this.household_size];
        } else if (7 <= this.household_size) {
            // The FNS documents refer to Household Size "6+"; the standard
            // deduction does not increase beyond household size of 6. Source:
            // https://fns-prod.azureedge.net/sites/default/files/media/file/FY20-Maximum-Allotments-Deductions.pdf
            return scale[6];
        } else {
            throw new Error('Household size out of bounds (at or below zero).');
        }
    }
}

