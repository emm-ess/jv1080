module.exports = {
    syntax: 'postcss-sass',

    plugins: [
        'stylelint-scss',
        'stylelint-no-unsupported-browser-features',
    ],

    extends: [
        'stylelint-config-standard',
        'stylelint-config-sass-guidelines',
        'stylelint-config-outside-in-order',
    ],

    rules: {
        'block-opening-brace-space-before': null,
        'block-opening-brace-space-after': null,
        'block-closing-brace-space-before': null,
        'block-closing-brace-newline-before': null,
        'declaration-block-trailing-semicolon': null,
        indentation: 4,
        'number-leading-zero': null,
        'font-family-name-quotes': 'always-where-recommended',
        'string-quotes': 'single',
        'at-rule-no-vendor-prefix': true,
        'media-feature-name-no-vendor-prefix': true,
        'property-no-vendor-prefix': true,
        'selector-no-vendor-prefix': true,
        'value-no-vendor-prefix': true,
        'max-nesting-depth': 4,
        'selector-max-id': 1,
        'selector-no-qualifying-type': null,
        'max-empty-lines': 3,
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,
        'plugin/no-unsupported-browser-features': [true, {
            'ignorePartialSupport': true,
        }],
    },

    root: true,
}
