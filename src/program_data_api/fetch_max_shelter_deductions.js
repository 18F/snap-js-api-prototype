import { MAX_SHELTER_DEDUCTIONS } from '../program_data/max_shelter_deductions.js';

export class FetchMatchShelterDeductions {
    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
    }

    state_lookup_key() {
        const NON_DEFAULT_STATES_TERRITORIES = [
            'AK',
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

        return MAX_SHELTER_DEDUCTIONS[state_lookup_key][2020];
    }
}