# Results checked against the Illinois Department of Human Services
# Potential SNAP Eligibility calculator:
#
# http://fscalc.dhs.illinois.gov/FSCalc/calculateFS.do
#
# Some calculations result in small differences, which may be due
# to rounding differences or slightly different data sets being used.

# A few surprising results from the Illinois calculator:
# * Standard deduction listed as $160 instead of $167.
# * Family of 3 with an elderly or disabled household member, medical expenses
#   of $135 lists Medical Deduction as $165 instead of $100.

Feature: Illinois scenarios, no EA waiver

  Background:
    Given the household is in IL
    Given no emergency allotment waiver

    # Defaults to override on a per-test basis:
    Given the household has earned income of $0 monthly
    Given the household has other income of $0 monthly
    Given the household has assets of $0
    Given the household does not include an elderly or disabled member


  # BASIC BENEFIT AMOUNT TESTS #

  Scenario: No income or assets, 1 person
    Given a 1-person household
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $194 per month

  Scenario: No income or assets, 2 people
    Given a 2-person household
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $355 per month

  Scenario: No income or assets, 3 people
    Given a 3-person household
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $509 per month

  Scenario: No income or assets, 10 people
    Given a 10-person household
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $1456 per month


  # GROSS INCOME TEST #

  Scenario: Household does not meet gross income test
    Given a 1-person household
    And the household has other income of $2000 monthly
    When we run the benefit estimator...
      Then we find the family is likely ineligible


  # MINIMUM ALLOTMENT #

  Scenario: Minimum allotment
    Given a 1-person household
    And the household has other income of $1040 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $16 per month

  Scenario: Minimum allotment does not apply to larger household
    Given a 4-person household
    And the household has other income of $2323 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $0 per month


  # EARNED INCOME DEDUCTION #

  Scenario:
    Given a 3-person household
    And the household has earned income of $1000 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $317 per month

  Scenario: Both earned income and other income
    Given a 3-person household
    And the household has earned income of $500 monthly
    And the household has other income of $500 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $287 per month


  # DEPENDENT CARE DEDUCTION #

  Scenario: Dependent care deduction
    Given a 3-person household
    And the household has earned income of $500 monthly
    And the household has other income of $500 monthly
    And the household has dependent care costs of $100 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $317 per month


  # MEDICAL EXPENSES DEDUCTION #

  Scenario: Medical expenses of $0 do not affect benefit amount
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $400 monthly
    And the household has other income of $400 monthly
    And the household has medical expenses for elderly or disabled members of $0 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $341 per month

  Scenario: Medical expenses of $35 do not affect benefit amount
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $400 monthly
    And the household has other income of $400 monthly
    And the household has medical expenses for elderly or disabled members of $35 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $341 per month

  Scenario: Medical expenses of $36 increase deduction by $165, benefit by ~$50
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $400 monthly
    And the household has other income of $400 monthly
    And the household has medical expenses for elderly or disabled members of $36 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $390 per month
