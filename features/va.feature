Feature: Virginia scenarios, no EA waiver

  Background:
    Given the household is in VA
    Given no emergency allotment waiver

  Scenario:
    Given a 1-person household
    And the household does not include an elderly or disabled member
    And the household has earned income of $0 monthly
    And the household has other income of $0 monthly
    And the household has assets of $0
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $194 per month

  Scenario:
    Given a 2-person household
    And the household does not include an elderly or disabled member
    And the household has earned income of $0 monthly
    And the household has other income of $0 monthly
    And the household has assets of $0
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $355 per month

  Scenario:
    Given a 3-person household
    And the household does not include an elderly or disabled member
    And the household has earned income of $0 monthly
    And the household has other income of $0 monthly
    And the household has assets of $0
    When we run the benefit estimator...
      Then we find the family is likely eligible
      And we find the estimated benefit is $509 per month

  Scenario: Ineligible household
    Given a 1-person household
    And the household does not include an elderly or disabled member
    And the household has earned income of $0 monthly
    And the household has other income of $2000 monthly
    And the household has assets of $0
    When we run the benefit estimator...
      Then we find the family is likely ineligible
      And we find the estimated benefit is $0 per month