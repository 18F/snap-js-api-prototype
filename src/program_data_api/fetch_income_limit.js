export class FetchIncomeLimit {
    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.income_limit_data = inputs.income_limit_data;
    }

    state_lookup_key() {
        // Use 'DEFAULT', unless the state is 'AK' or 'HI'
        if (!(['AK', 'HI'].includes(this.state_or_territory))) return 'DEFAULT';

        return this.state_or_territory;
    }

    income_limit_lookup() {
        const state_lookup_key = this.state_lookup_key();
        const scale = this.income_limit_data[state_lookup_key][2020];

        if (0 < this.household_size && this.household_size < 9) {
            return scale[this.household_size];
        } else if (9 <= this.household_size) {
            return scale[8] + ((this.household_size - 8) * (scale['each_additional']));
        } else if (this.household_size <= 0) {
            throw new Error('Household size out of bounds (at or below zero).');
        }
    }
}
