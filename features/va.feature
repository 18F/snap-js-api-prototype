Feature: Virginia scenarios, no EA waiver

  Background:
    Given the household is in VA
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


  # GROSS AND NET INCOME TESTS #

  # Using a VA gross income limit of $1,354 ($1041 * 1.3) #

  Scenario: Household above limit does not meet gross income test
    Given a 1-person household
    And the household has other income of $1360 monthly
    When we run the benefit estimator...
      Then we find the family is likely ineligible

  Scenario: Household that meets the gross income test but does not meet the net income test
    Given a 1-person household
    And the household has other income of $1340 monthly
    When we run the benefit estimator...
      Then we find the family is likely ineligible

  Scenario: Household that meets both gross and net income tests
    Given a 1-person household
    And the household has other income of $700 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      Then we find the estimated benefit is $34 per month


  # EMERGENCY ALLOTMENTS #

  Scenario: Household that meets both gross and net income tests
    Given a 1-person household
    And the household has other income of $700 monthly
    And an emergency allotment waiver
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $194 per month
      And we find the estimated benefit at the start of the month is $34


  # ASSET TEST #

  Scenario: Household with assets below the asset test limit, no elderly or disabled household members
    Given a 1-person household
    And the household has assets of $1900
    When we run the benefit estimator...
      Then we find the family is likely eligible

  Scenario: Household with assets above the asset test limit, no elderly or disabled household members
    Given a 1-person household
    And the household has assets of $3000
    When we run the benefit estimator...
      Then we find the family is likely ineligible

  Scenario: Household with elderly or disabled member and assets below the higher limit
    Given a 1-person household
    And the household does include an elderly or disabled member
    And the household has assets of $3000
    When we run the benefit estimator...
      Then we find the family is likely eligible

  Scenario: Household with elderly or disabled member and assets above the higher limit
    Given a 1-person household
    And the household does include an elderly or disabled member
    And the household has assets of $4000
    When we run the benefit estimator...
      Then we find the family is likely ineligible


  # CHILD SUPPORT PAYMENTS DEDUCTION #

  Scenario:
    Given a 1-person household
    And the household has other income of $1000 monthly
    And the household has court-ordered child support payments of $300 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $34 per month

  Scenario: Higher child support payment increases benefit
    Given a 1-person household
    And the household has other income of $1000 monthly
    And the household has court-ordered child support payments of $600 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $124 per month


  # MEDICAL STANDARD DEDUCTION #

  Scenario: Household with medical expenses below $35 threshold
    Given a 1-person household
    And the household has other income of $700 monthly
    And the household does include an elderly or disabled member
    And the household has medical expenses for elderly or disabled members of $34 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      Then we find the estimated benefit is $34 per month

  Scenario: Household with medical expenses above $35 threshold
    Given a 1-person household
    And the household has other income of $700 monthly
    And the household does include an elderly or disabled member
    And the household has medical expenses for elderly or disabled members of $36 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      Then we find the estimated benefit is $94 per month

  Scenario: Household with medical expenses below $235 threshold
    Given a 1-person household
    And the household has other income of $700 monthly
    And the household does include an elderly or disabled member
    And the household has medical expenses for elderly or disabled members of $234 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      Then we find the estimated benefit is $94 per month

  Scenario: Household with medical expenses above $235 threshold
    Given a 1-person household
    And the household has other income of $700 monthly
    And the household does include an elderly or disabled member
    And the household has medical expenses for elderly or disabled members of $300 monthly
    When we run the benefit estimator...
      Then we find the family is likely eligible
      Then we find the estimated benefit is $124 per month
