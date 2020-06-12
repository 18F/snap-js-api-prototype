import { Given, Then, When } from 'cucumber';
import assert from 'assert';
import { SnapEstimateEntrypoint } from '../../src/snap_estimate_entrypoint.js';

Given('the household is in {word}', function (state_or_territory) {
  this.state_or_territory = state_or_territory;
});

Given('an emergency allotment waiver', function () {
  this.use_emergency_allotment = true;
});

Given('no emergency allotment waiver', function () {
  this.use_emergency_allotment = false;
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

Given('the household has court-ordered child support payments of ${int} monthly', function (court_ordered_child_support_payments) {
  this.court_ordered_child_support_payments = court_ordered_child_support_payments;
});

Given('the household has medical expenses for elderly or disabled members of ${int} monthly', function (medical_expenses_for_elderly_or_disabled) {
  this.medical_expenses_for_elderly_or_disabled = medical_expenses_for_elderly_or_disabled;
});

Given('the household has rent or mortgage costs of ${int} monthly', function (rent_or_mortgage) {
  this.rent_or_mortgage = rent_or_mortgage;
});

Given('the household has homeowners insurance and taxes costs of ${int} monthly', function (homeowners_insurance_and_taxes) {
  this.homeowners_insurance_and_taxes = homeowners_insurance_and_taxes;
});

Given('the household pays for AC or heat, or otherwise qualifies for AC-heat utility allowance', function () {
  this.utility_allowance = 'HEATING_AND_COOLING';
});

Given('the household pays for water and trash collection, or otherwise qualifies for limited utility allowance', function () {
    this.utility_allowance = 'BASIC_LIMITED_ALLOWANCE';
});

Given('the household pays for a single utility besides AC, heat, and phone', function () {
    this.utility_allowance = 'SINGLE_UTILITY_ALLOWANCE';
});

Given('the household pays phone bills only', function () {
    this.utility_allowance = 'PHONE';
});

Given('the household is not billed separately for any utilities', function () {
    this.utility_allowance = 'NONE';
});

Given('the household has utility costs of ${int} monthly', function (utility_costs) {
  this.utility_costs = utility_costs;
});

When('we run the benefit estimator...', function () {
  const snap_estimator = new SnapEstimateEntrypoint({
    'household_includes_elderly_or_disabled': this.household_includes_elderly_or_disabled,
    'state_or_territory': this.state_or_territory,
    'monthly_job_income': this.monthly_job_income,
    'monthly_non_job_income': this.monthly_non_job_income,
    'household_size': this.household_size,
    'resources': this.assets,
    'dependent_care_costs': this.dependent_care_costs || 0,
    'medical_expenses_for_elderly_or_disabled': this.medical_expenses_for_elderly_or_disabled || 0,
    'court_ordered_child_support_payments': this.court_ordered_child_support_payments || 0,
    'rent_or_mortgage': this.rent_or_mortgage || 0,
    'homeowners_insurance_and_taxes': this.homeowners_insurance_and_taxes || 0,
    'utility_allowance': this.utility_allowance || 'NONE',
    'use_emergency_allotment': this.use_emergency_allotment,
  });

  const result = snap_estimator.calculate();

  this.estimated_benefit = result.estimated_benefit;
  this.estimated_eligibility = result.estimated_eligibility;
  this.estimated_benefit_start_of_month = result.estimated_benefit_start_of_month;
});

Then('we find the estimated benefit is ${int} per month', function (estimated_benefit) {
  assert.equal(this.estimated_benefit, estimated_benefit);
});

Then('we find the estimated benefit at the start of the month is ${int}', function (estimated_benefit_start_of_month) {
  assert.equal(this.estimated_benefit_start_of_month, estimated_benefit_start_of_month);
});

Then('we find the family is likely {word}', function (estimated_eligibility) {
  const eligibility_bool = (estimated_eligibility === 'eligible');

  assert.equal(this.estimated_eligibility, eligibility_bool);
});
