import { NET_MONTHLY_INCOME_LIMITS } from '../program_data/net_monthly_income_limits.js';

export class FetchIncomeLimit {
    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.target_year = inputs.target_year;
    }

    state_lookup_key() {
        // Use 'DEFAULT', unless the state is 'AK' or 'HI'
        if ((['AK', 'HI'].indexOf(this.state_or_territory) === -1)) return 'DEFAULT';

        return this.state_or_territory;
    }

    income_limit_lookup() {
        const state_lookup_key = this.state_lookup_key();
        const scale = NET_MONTHLY_INCOME_LIMITS[state_lookup_key][this.target_year];

        if (0 < this.household_size && this.household_size < 9) {
            return scale[this.household_size];
        } else if (9 <= this.household_size) {
            return scale[8] + ((this.household_size - 8) * (scale['each_additional']));
        } else if (this.household_size <= 0) {
            throw new Error('Household size out of bounds (at or below zero).');
        }
    }
}
