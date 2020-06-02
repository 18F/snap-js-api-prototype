import { Given, Then, When } from 'cucumber';
import assert from 'assert';
import { SnapEstimateEntrypoint } from '../../src/snap_estimate_entrypoint.js';

Given('the household is in {word}', function (state_or_territory) {
  this.state_or_territory = state_or_territory;
});

Given('{word} emergency allotment waiver', function (emergency_allotment) {
  this.emergency_allotment = (emergency_allotment === 'an');
});

Given('a {int}-person household', function (household_size) {
  this.household_size = household_size
});

Given('the household does not include an elderly or disabled member', function () {
  this.household_includes_elderly_or_disabled = false;
});

Given('the household does include an elderly or disabled member', function () {
  this.household_includes_elderly_or_disabled = true;
});

Given('the household has earned income of ${int} monthly', function (monthly_job_income) {
  this.monthly_job_income = monthly_job_income;
});

Given('the household has other income of ${int} monthly', function (monthly_non_job_income) {
  this.monthly_non_job_income = monthly_non_job_income;
});

Given('the household has assets of ${int}', function (assets) {
  this.assets = assets;
});

Given('the household has dependent care costs of ${int} monthly', function (dependent_care_costs) {
  this.dependent_care_costs = dependent_care_costs;
});

When('we run the benefit estimator...', function () {
  const snap_estimator = new SnapEstimateEntrypoint({
    'state_or_territory': this.state_or_territory,
    'monthly_job_income': this.monthly_job_income,
    'monthly_non_job_income': this.monthly_non_job_income,
    'household_size': this.household_size,
    'household_includes_elderly_or_disabled': this.household_includes_elderly_or_disabled,
    'resources': this.assets,
    'use_emergency_allotment': this.emergency_allotment,
  });

  snap_estimator.calculate();

  this.estimated_benefit = snap_estimator.estimated_benefit;
  this.estimated_eligibility = snap_estimator.estimated_eligibility;
});

Then('we find the estimated benefit is ${int} per month', function (estimated_benefit) {
  assert.equal(this.estimated_benefit, estimated_benefit);
});

Then('we find the family is likely {word}', function (estimated_eligibility) {
  const eligibility_bool = (estimated_eligibility === 'eligible');

  assert.equal(this.estimated_eligibility, eligibility_bool);
});
