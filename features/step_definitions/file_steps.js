import { Given, Then, When } from 'cucumber';
import assert from 'assert';
import { SnapEstimateEntrypoint } from '../../src/snap_estimate_entrypoint.js';

Given('the household is in {word}', function (stateOrTerritory) {
  this.stateOrTerritory = 'AK';
});

Given('{word} emergency allotment waiver', function (emergencyAllotment) {
  this.emergencyAllotment = (emergencyAllotment === 'an');
});

Given('a {int}-person household', function (householdSize) {
  this.householdSize = householdSize
});

Given('the household does {word} include an elderly or disabled member', function (elderlyOrDisabled) {
  this.elderlyOrDisabled = (elderlyOrDisabled !== 'not');
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
    'state_or_territory': this.stateOrTerritory,
    'monthly_job_income': this.monthlyEarnedIncome,
    'monthly_non_job_income': this.monthlyOtherIncome,
    'household_size': this.householdSize,
    'household_includes_elderly_or_disabled': this.elderlyOrDisabled,
    'resources': this.assets,
    'use_emergency_allotment': this.emergencyAllotment,
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
