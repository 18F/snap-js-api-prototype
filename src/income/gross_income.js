export class GrossIncome {
    constructor(inputs) {
        this.monthly_job_income = inputs.monthly_job_income;
        this.monthly_non_job_income = inputs.monthly_non_job_income;
        this.child_support_payments_treatment = inputs.child_support_payments_treatment;
        this.court_ordered_child_support_payments = inputs.court_ordered_child_support_payments;
    }

    calculate() {
        const child_support_payments_excluded = this.child_support_payments_excluded();

        if (child_support_payments_excluded) {
            return this.calculate_excluding_child_support();
        } else {
            return this.calculate_without_excluding_child_support();
        }
    }

    child_support_payments_excluded() {
        if (this.child_support_payments_treatment !== 'EXCLUDE') return false;
        if (this.court_ordered_child_support_payments === 0) return false;
        return true;
    }

    calculate_excluding_child_support() {
        const monthly_income = this.monthly_job_income + this.monthly_non_job_income;
        const explanation = [];

        const child_support_payments_explanation = (
            'In this state, court-ordered child support payments are ' +
            'counted as a gross income exclusion. The gross income is ' +
            'adjusted to exclude monthly court-ordered child support:'
        );
        explanation.push(child_support_payments_explanation);

        const monthly_income_minus_child_support = (
            monthly_income - this.court_ordered_child_support_payments
        );

        const child_support_payments_math = (
            `$${monthly_income} - ` +
            `$${this.court_ordered_child_support_payments} = ` +
            `$${monthly_income_minus_child_support} gross income`
        );
        explanation.push(child_support_payments_math);

        return {
            'name': 'Gross Income',
            'result': monthly_income_minus_child_support,
            'explanation': explanation,
            'sort_order': 0,
            'type': 'income',
        };
    }

    calculate_without_excluding_child_support() {
        const explanation = [];

        const gross_income_intro = (
            'We start with calculating gross income. We find the household\'s gross income by adding up monthly income from both job and non-job sources.'
        );
        explanation.push(gross_income_intro);

        const monthly_income = this.monthly_job_income + this.monthly_non_job_income;

        const gross_income_math = (
            `$${this.monthly_job_income} monthly job income + ` +
            `$${this.monthly_non_job_income} monthly non-job income = ` +
            `<strong>$${monthly_income} gross income</strong>`
        );
        explanation.push(gross_income_math);

        return {
            'name': 'Gross Income',
            'result': monthly_income,
            'explanation': explanation,
            'sort_order': 0,
            'type': 'income',
        };
    }
}