# Prototype: SNAP Eligibility in Javascript

This is a sketchpad prototyping repo being used by 18F's [Eligibility APIs Initiative](https://github.com/18F/eligibility-rules-service/blob/master/README.md) to explore expressing SNAP eligibility through a Javascript API.

The rules and tests are being translated over from our Python [18F/snap-api-prototype](https://github.com/18F/snap-api-prototype) project, which may be deprecated in favor of the Javascript version. Expressing the rules in Javascript will allow us to create serverless SNAP prescreeners and calculators with only HTML+CSS+JS, making them easier for partners to implement or embed. We also hypothesize that removing the server layer will simplify security and compliance.

:warning: ***None of the eligibility rules expressed in this repository should be considered official interpretations of SNAP rules or policy. This is a sketchpad prototyping repo only.*** :warning:

# What does this do?

This prototype SNAP API calculates a household's estimated eligibility for the SNAP program. The API accepts inputs about a household and returns the following:

+ an estimate of that household's SNAP eligibility
+ an estimated benefit amount
+ an explanation of the logic behind the API's decision-making
+ a link to a state website where a household could apply for SNAP

# Development

### Commands

Run feature tests, unit tests, type checks (partially implemented), and linter:

```
npm check-all
```

Build minified, browser-ready Javascript:

```
npm run build
```

See `package.json` for all developer commands.

### Notes

+ This project aims for the API itself to have no npm dependencies. The libraries included in `package.json` are used to compile and test the Javascript API, but none of them are bundled into the compiled API itself.

+ This project is using [flow](https://flow.org/) for type checking, with flow checks being added incrementally file-by-file. Flow type checking coverage is currently low.
