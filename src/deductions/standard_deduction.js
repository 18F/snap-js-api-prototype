import { FetchStandardDeductions } from '../program_data_api/fetch_standard_deductions.js';

export class StandardDeduction {
    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
    }

    calculate() {
        const deductions_api = new FetchStandardDeductions({
            'state_or_territory': this.state_or_territory,
            'household_size': this.household_size,
        });

        const result = deductions_api.calculate();

        const standard_deduction_pdf_url = 'https://fns-prod.azureedge.net/sites/default/files/media/file/FY20-Maximum-Allotments-Deductions.pdf';

        const explanation = [
            `Next, we need to take into account deductions. We start with a standard deduction of $${result}. <a class='why why-small' href='${standard_deduction_pdf_url}' target='_blank'>why?</a>`
        ];

        return {
            'result': result,
            'explanation': explanation
        };
    }
}

