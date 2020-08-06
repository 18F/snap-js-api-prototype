# Prototype: SNAP Eligibility in Javascript

This is a sketchpad prototyping repo being used by 18F's [Eligibility APIs Initiative](https://github.com/18F/eligibility-rules-service/blob/master/README.md) to explore expressing SNAP eligibility through a Javascript API.

:warning: ***None of the eligibility rules expressed in this repository should be considered official interpretations of SNAP rules or policy. This is a sketchpad prototyping repo only.*** :warning:

# What does this API do?

This prototype SNAP API calculates a household's estimated eligibility for the SNAP program. The API accepts inputs about a household and returns the following:

+ an estimate of that household's SNAP eligibility
+ an estimated benefit amount
+ an explanation of the logic behind the API's decision-making

## What problem does this aim to solve?

* As a developer building a project that requires SNAP eligibility logic, I want to pull from an existing source of SNAP eligibility logic rather than reinventing for my own use case.

# Development

## Guides and more documentation

See the [project wiki](https://github.com/18f/snap-js-api-prototype/wiki) for guides and project documentation, including API documentation.

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

### Developer notes

+ This project aims for the API itself to have no npm dependencies. The libraries included in `package.json` are used to compile and test the Javascript API, but none of them are bundled into the compiled API itself.

+ This project is using [flow](https://flow.org/) for type checking, with flow checks being added incrementally file-by-file. Flow type checking coverage is currently low.
