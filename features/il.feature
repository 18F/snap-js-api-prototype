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
