import { Given, Then, When } from 'cucumber';
import assert from 'assert';
import { SnapEstimateEntrypoint } from '../../src/snap_estimate_entrypoint.js';

Given('the household is in {word}', function (state_or_territory) {
  this.state_or_territory = state_or_territory;
});

Given('{word} emergency allotment waiver', function (emergency_allotment) {
  this.emergency_allotment = (emergency_allotment === 'an');
});

Given('a {int}-person household', function (householdSize) {
  this.householdSize = householdSize
});

Given('the household does not include an elderly or disabled member', function () {
  this.elderlyOrDisabled = false;
});

Given('the household does include an elderly or disabled member', function () {
  this.elderlyOrDisabled = true;
});

Given('the household has earned income of ${int} monthly', function (monthlyEarnedIncome) {
  this.monthlyEarnedIncome = monthlyEarnedIncome;
});

Given('the household has other income of ${int} monthly', function (monthlyOtherIncome) {
  this.monthlyOtherIncome = monthlyOtherIncome;
});

Given('the household has assets of ${int}', function (assets) {
  this.assets = assets;
});

When('we run the benefit estimator...', function () {
  const snapEstimator = new SnapEstimateEntrypoint({
    'state_or_territory': this.state_or_territory,
    'monthly_job_income': this.monthlyEarnedIncome,
    'monthly_non_job_income': this.monthlyOtherIncome,
    'household_size': this.householdSize,
    'household_includes_elderly_or_disabled': this.elderlyOrDisabled,
    'resources': this.assets,
    'use_emergency_allotment': this.emergency_allotment,
  });

  snapEstimator.calculate();

  this.estimated_benefit = snapEstimator.estimated_benefit;
  this.estimated_eligibility = snapEstimator.estimated_eligibility;
});

Then('we find the estimated benefit is ${int} per month', function (estimated_benefit) {
  assert.equal(this.estimated_benefit, estimated_benefit);
});

Then('we find the family is likely {word}', function (estimated_eligibility) {
  const eligibility_bool = (estimated_eligibility === 'eligible');

  assert.equal(this.estimated_eligibility, eligibility_bool);
});
