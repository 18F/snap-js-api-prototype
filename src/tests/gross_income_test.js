class GrossIncomeTest {
  constructor(inputs) {
    this.state_or_territory = inputs.state_or_territory;
    this.household_size = inputs.household_size;
    this.household_includes_elderly_or_disabled = inputs.household_includes_elderly_or_disabled;
    this.resources = inputs.resources;
    this.gross_income = inputs.gross_income;
    this.net_monthly_income_limit = inputs.net_monthly_income_limit;
    this.gross_income_limit_factor = inputs.gross_income_limit_factor;

    // Set gross monthly income limit; derived from net monthly income limit
    this.gross_monthly_income_limit = Math.round(
      this.gross_income_limit_factor * this.net_monthly_income_limit
    );
  }

  calculate() {
    if (this.household_includes_elderly_or_disabled) {
      return {
        'name': 'Gross Income Test',
        'result': true,
        'explanation': [
            'Households with an elderly or disabled member do not need to meet the gross income test.'
        ],
        'sort_order': 2,
      }
    }

    let explanation = [
      'Next, we check gross income (total income without deductions).'
    ];

    const below_gross_income_limit = (
      this.gross_monthly_income_limit > this.gross_income
    );

    const income_limits_pdf_url = 'https://fns-prod.azureedge.net/sites/default/files/media/file/FY20-Income-Eligibility-Standards.pdf';
    const gross_monthly_income_limit_explanation = `The gross monthly income limit is $${this.gross_monthly_income_limit}. <a class='why why-small' href='${income_limits_pdf_url}' target='_blank'>why?</a>`;

    explanation.push(gross_monthly_income_limit_explanation);

    const result_to_words = { true: 'passes', null: 'does not meet' };
    const result_in_words = result_to_words[below_gross_income_limit];
    const result_explanation = `Since the household gross income is $${this.gross_income}, this household <strong>${result_in_words}</strong> the gross income test.`;
    explanation.push(result_explanation);

    return {
      'name': 'Gross Income Test',
      'result': below_gross_income_limit,
      'explanation': explanation,
      'sort_order': 2,
    }
  }
}

export { GrossIncomeTest }