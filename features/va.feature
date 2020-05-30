Feature: Virginia scenarios, no EA waiver

  Background:
    Given the household is in VA
    Given no emergency allotment waiver

    # Defaults to override on a per-test basis:
    Given the household has earned income of $0 monthly
    Given the household has other income of $0 monthly
    Given the household has assets of $0

  # BASIC BENEFIT AMOUNT TESTS #

  Scenario: No income or assets, 1 person
    Given a 1-person household
    And the household does not include an elderly or disabled member
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $194 per month

  Scenario: No income or assets, 2 people
    Given a 2-person household
    And the household does not include an elderly or disabled member
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $355 per month

  Scenario: No income or assets, 3 people
    Given a 3-person household
    And the household does not include an elderly or disabled member
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $509 per month

  Scenario: No income or assets, 10 people
    Given a 10-person household
    And the household does not include an elderly or disabled member
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $1456 per month

  # GROSS INCOME TEST #

  Scenario: Household does not meet gross income test
    Given a 1-person household
    And the household does not include an elderly or disabled member
    And the household has other income of $2000 monthly
    When we run the benefit estimator...
      Then we find the family is likely ineligible

  # ASSET TEST #

  Scenario:
    Given a 1-person household
    And the household does not include an elderly or disabled member
    And the household has assets of $1900
    When we run the benefit estimator...
      Then we find the family is likely eligible

  Scenario:
    Given a 1-person household
    And the household does not include an elderly or disabled member
    And the household has assets of $3000
    When we run the benefit estimator...
      Then we find the family is likely ineligible

  Scenario:
    Given a 1-person household
    And the household does include an elderly or disabled member
    And the household has assets of $3000
    When we run the benefit estimator...
      Then we find the family is likely eligible

  Scenario:
    Given a 1-person household
    And the household does include an elderly or disabled member
    And the household has assets of $4000
    When we run the benefit estimator...
      Then we find the family is likely ineligible