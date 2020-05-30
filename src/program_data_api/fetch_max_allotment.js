import { MAX_ALLOTMENTS } from '../program_data/max_allotments.js';

export class FetchMaxAllotment {
    // Uses a state or territory and a household size to fetch the max allotment,
    // using arithmetic to add an additional amount to the allotment for each
    // household member beyond eight.
    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.income_limit_data = inputs.income_limit_data;
    }

    state_lookup_key() {
        const NON_DEFAULT_STATES_TERRITORIES = [
            'AK_URBAN',
            'AK_RURAL_1',
            'AK_RURAL_2',
            'HI',
            'GUAM',
            'VIRGIN_ISLANDS',
        ];

        return NON_DEFAULT_STATES_TERRITORIES.includes(this.state_or_territory)
            ? this.state_or_territory
            : 'DEFAULT';
    }

    calculate() {
        const state_lookup_key = this.state_lookup_key();
        const scale = MAX_ALLOTMENTS[state_lookup_key][2020];

        if (0 < this.household_size && this.household_size < 9) {
            return scale[this.household_size];
        } else if (9 <= this.household_size) {
            return scale[8] + ((this.household_size - 8) * (scale['each_additional']));
        } else if (this.household_size <= 0) {
            throw new Error('Household size out of bounds (at or below zero).');
        }
    }
}
