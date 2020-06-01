// This is a stub for now.
// The fully-modeled-out version should includ child support payments exclusion.
export class GrossIncome {
    constructor(inputs) {
        this.monthly_job_income = inputs.monthly_job_income;
        this.monthly_non_job_income = inputs.monthly_non_job_income;
    }

    calculate() {
        return this.monthly_job_income + this.monthly_non_job_income;
    }
}