# Prototype: SNAP Eligibility in JS

This is a sketchpad prototyping repo being used by 18F's [Eligibility APIs Initiative](https://github.com/18F/eligibility-rules-service/blob/master/README.md) to explore the expressing SNAP eligibility through a JavaScript API.

:warning: ***None of the eligibility rules expressed in this repository should be considered official interpretations of SNAP rules or policy. This is a sketchpad prototyping repo only.*** :warning:

# What does this do?

This prototype SNAP API calculates a household's estimated eligibility for the SNAP program. The API accepts inputs about a household and returns the following:

+ an estimate of that household's SNAP eligibility
+ an estimated benefit amount
+ an explanation of the logic behind the API's decision-making
+ a link to a state website where a household could apply for SNAP

# Development

Run the feature tests:

```
npm test
```

Build minified and browser-ready JS:

```
npm run build
```