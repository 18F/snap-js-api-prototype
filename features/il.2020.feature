# Results checked against the Illinois Department of Human Services
# Potential SNAP Eligibility calculator:
#
# http://fscalc.dhs.illinois.gov/FSCalc/calculateFS.do
#
# Some calculations result in small differences, which may be due
# to rounding differences or slightly different data sets being used.

Feature: Illinois scenarios, no EA waiver

  Background:
    Given the household is in IL
    Given no emergency allotment waiver
    Given the SNAP fiscal year is 2020

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

  Scenario: Household passes net income test but not gross income test
    Given a 3-person household
    And the household has earned income of $1000 monthly
    And the household has other income of $2000 monthly
    And the household has dependent care costs of $1000 monthly
    When we run the benefit estimator...
      Then we find the family is likely ineligible
      And we find the estimated benefit is $0 per month


  # MINIMUM ALLOTMENT #

  Scenario: Minimum allotment
    Given a 1-person household
    And the household has other income of $1040 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $16 per month

  # This is a household whose income just barely passes the gross
  # and net income tests for Illinois. The household's benefit
  # amount is smaller than the IL minimum benefit amount, but
  # the minimum amount does not apply because of household size.
  Scenario: Minimum allotment does not apply to larger household
    Given a 4-person household
    And the household has other income of $2280 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $13 per month


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

  Scenario: Medical expenses of $36 increase deduction by $200, benefit by $60
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $400 monthly
    And the household has other income of $400 monthly
    And the household has medical expenses for elderly or disabled members of $36 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $401 per month

  Scenario: Medical expenses of $135 increase deduction by $200, benefit by $60
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $400 monthly
    And the household has other income of $400 monthly
    And the household has medical expenses for elderly or disabled members of $135 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $401 per month

  Scenario: Medical expenses of $335 increase deduction by $300, benefit by $90
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $400 monthly
    And the household has other income of $400 monthly
    And the household has medical expenses for elderly or disabled members of $335 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $431 per month

  Scenario: Medical expenses do not affect benefit if household does not include an elderly or disabled member
    Given a 3-person household
    And the household does not include an elderly or disabled member
    And the household has earned income of $400 monthly
    And the household has other income of $400 monthly
    And the household has medical expenses for elderly or disabled members of $135 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $341 per month


  # CHILD SUPPORT PAYMENTS EXCLUSION #

  Scenario: Child support payments exclusion pushes household into eligibility
    Given a 3-person household
    And the household has earned income of $1000 monthly
    And the household has other income of $2000 monthly
    And the household has dependent care costs of $1000 monthly
    And the household has court-ordered child support payments of $100 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $47 per month

  Scenario: More child support payments increase estimated benefit
    Given a 3-person household
    And the household has earned income of $1000 monthly
    And the household has other income of $2000 monthly
    And the household has dependent care costs of $1000 monthly
    And the household has court-ordered child support payments of $400 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $137 per month


  # EXCESS SHELTER DEDUCTION #

    Scenario: Household where shelter costs do not exceed half of adjusted income
    Given a 3-person household
    And the household has earned income of $500 monthly
    And the household has other income of $500 monthly
    And the household has rent or mortgage costs of $300 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $287 per month

  Scenario: Household where shelter costs exceed half of adjusted income by ~$100
    Given a 3-person household
    And the household has earned income of $500 monthly
    And the household has other income of $500 monthly
    And the household has rent or mortgage costs of $467 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $316 per month

  Scenario: Household where shelter costs exceed half of adjusted income by ~$100 and the household includes an elderly or disabled household member
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $500 monthly
    And the household has other income of $500 monthly
    And the household has rent or mortgage costs of $467 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $316 per month

  Scenario: Household where shelter costs exceed half of adjusted income by ~$200
    Given a 3-person household
    And the household has earned income of $500 monthly
    And the household has other income of $500 monthly
    And the household has rent or mortgage costs of $567 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $346 per month

  Scenario: Household with excess shelter costs that exceed the IL 2020 max ($569) that includes an elderly or disabled household member
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $500 monthly
    And the household has other income of $500 monthly
    And the household has rent or mortgage costs of $1067 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $496 per month

  Scenario: Household with excess shelter costs that exceed the IL 2020 max ($569) that does not include an elderly or disabled household member
    Given a 3-person household
    And the household has earned income of $500 monthly
    And the household has other income of $500 monthly
    And the household has rent or mortgage costs of $1067 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $458 per month

  Scenario: Household would have a low benefit amount without taking utilities into account
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $3000 monthly
    And the household has rent or mortgage costs of $1800 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $41 per month

  Scenario: Household pays for AC or heat separately
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $3000 monthly
    And the household has rent or mortgage costs of $1800 monthly
    And the household pays for AC or heat, or otherwise qualifies for AC-heat utility allowance
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $184 per month

  Scenario: Household pays for two utilities besides AC and heat
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $3000 monthly
    And the household has rent or mortgage costs of $1800 monthly
    And the household pays for water and trash collection, or otherwise qualifies for limited utility allowance
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $139 per month

  Scenario: Household pays a single utility besides AC, heat, and phone
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $3000 monthly
    And the household has other income of $0 monthly
    And the household has rent or mortgage costs of $1800 monthly
    And the household pays for a single utility besides AC, heat, and phone
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $63 per month

  Scenario: Household pays for telephone only
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $3000 monthly
    And the household has rent or mortgage costs of $1800 monthly
    And the household pays phone bills only
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $50 per month

  Scenario: Household not billed separately for any utilities (client explicitly tells API as opposed to leaving field blank)
    Given a 3-person household
    And the household does include an elderly or disabled member
    And the household has earned income of $3000 monthly
    And the household has rent or mortgage costs of $1800 monthly
    And the household is not billed separately for any utilities
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $41 per month
