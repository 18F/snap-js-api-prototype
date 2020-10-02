import { FetchStandardDeductions } from '../program_data_api/fetch_standard_deductions.js';

export class StandardDeduction {
    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.target_year = inputs.target_year;
    }

    calculate() {
        const deductions_api = new FetchStandardDeductions({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
            'target_year': this.target_year,
        });

        const result = deductions_api.calculate();

        const explanation = [
            `Next, we need to take into account deductions. We start with a standard deduction of $${result}.`
        ];

        return {
            'result': result,
            'explanation': explanation
        };
    }
}

