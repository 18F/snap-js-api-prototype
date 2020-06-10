export class AssetTest {
    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.household_includes_elderly_or_disabled = inputs.household_includes_elderly_or_disabled;
        this.resources = inputs.resources;
        this.resource_limit_elderly_or_disabled = inputs.resource_limit_elderly_or_disabled;
        this.resource_limit_non_elderly_or_disabled = inputs.resource_limit_non_elderly_or_disabled;
    }

    calculate() {
        if (!this.resource_limit_elderly_or_disabled &&
            !this.resource_limit_non_elderly_or_disabled) {
            return {
                'name': 'Asset Test',
                'result': true,
                'explanation': [
                    `${this.state_or_territory} does not have an asset test for SNAP eligibility.`
                ],
                'sort_order': 4,
            };
        }

        let resource_limit;
        let explanation;

        if (this.household_includes_elderly_or_disabled) {
            resource_limit = this.resource_limit_elderly_or_disabled;
            explanation = [
                `Since the household includes an elderly or disabled member, the resource limit is $${resource_limit}.`
            ];
        } else {
            resource_limit = this.resource_limit_non_elderly_or_disabled;
            explanation = [
                `Since the household does not include an elderly or disabled member, the resource limit is $${resource_limit}.`
            ];
        }

        const below_resource_limit = this.resources <= resource_limit;
        explanation.push(
            `Since this household has resources of $${this.resources}, it <strong>${below_resource_limit ? 'meets' : 'does not meet'}</strong> the asset test.`
        );

        return {
            'name': 'Asset Test',
            'result': below_resource_limit,
            'explanation': explanation,
            'sort_order': 4,
        };
    }
}