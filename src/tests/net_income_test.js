export class NetIncomeTest {
    constructor(inputs) {
        this.net_income = inputs.net_income;
        this.net_monthly_income_limit = inputs.net_monthly_income_limit;
    }

    calculate() {
        const below_net_income_limit = this.net_monthly_income_limit > this.net_income;

        const explanation = [];
        const explanation_intro = (
            'To be eligible for SNAP, a household\'s net income needs to be below ' +
            'the net monthly income limit.'
        );
        explanation.push(explanation_intro);

        const income_limits_pdf_url = 'https://fns-prod.azureedge.net/sites/default/files/media/file/FY20-Income-Eligibility-Standards.pdf';
        const net_monthly_income_limit_explanation = (
            `The net monthly income limit is $${this.net_monthly_income_limit}. <a class='why why-small' href='${income_limits_pdf_url}' target='_blank'>why?</a>`
        );
        explanation.push(net_monthly_income_limit_explanation);

        const result_in_words = (below_net_income_limit)
            ? 'passes'
            : 'does not meet';

        const result_explanation = (
            `Since the household net income (gross income minus deductions for expenses) is $${this.net_income}, this household <strong>${result_in_words}</strong> the net income test.`
        );
        explanation.push(result_explanation);

        return {
            'name': 'Net Income Test',
            'result': below_net_income_limit,
            'explanation': explanation,
            'sort_order': 3,
            'type': 'test'
        };
    }
}

