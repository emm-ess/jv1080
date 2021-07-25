module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },

    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
    },

    plugins: [
        'simple-import-sort',
    ],

    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
        '@vue/eslint-config-standard',

        // lint Vues SFC Styles
        'plugin:vue-scoped-css/recommended',

        // code-smell-detection / code-quality
        'plugin:unicorn/recommended',
        'plugin:sonarjs/recommended',

        // imports & import-sorting
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',

        // misc
        'plugin:eslint-comments/recommended',
        'plugin:json/recommended',
        'plugin:compat/recommended',
    ],

    rules: {
        'no-console': process.env.NODE_ENV === 'production'
            ? 'error'
            : 'off',
        'no-debugger': process.env.NODE_ENV === 'production'
            ? 'error'
            : 'off',
        indent: [
            'error',
            4,
            {
                // 0 would be nicer but somehow eslint is not working with that
                SwitchCase: 1,
            },
        ],
        'brace-style': [
            'error',
            'stroustrup',
            {
                allowSingleLine: true,
            },
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'no-multi-spaces': [
            'error',
            {
                exceptions: {
                    VariableDeclarator: true,
                    ImportDeclaration: true,
                },
            },
        ],
        'comma-dangle': ['error', 'always-multiline'],
        'key-spacing': [
            'error',
            {
                mode: 'minimum',
            },
        ],
        'object-property-newline': [
            'error',
            {
                allowAllPropertiesOnSameLine: true,
            },
        ],
        semi: [
            'error',
            'never',
            {
                beforeStatementContinuationChars: 'always',
            },
        ],
        'multiline-ternary': ['warn', 'always'],
        'operator-linebreak': ['warn', 'before'],
        quotes: ['error', 'single'],
        'prettier/prettier': ['off'],

        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
            },
        ],
        'quote-props': ['error', 'as-needed'],
        'object-curly-spacing': ['error', 'never'],
        'arrow-parens': ['error', 'always'],

        // vue styles
        'vue-scoped-css/require-scoped': 'off',
        // vue-scoped-css can't deal with SASS :(
        'vue-scoped-css/no-parsing-error': 'off',

        // code smell
        // well vue needs null instead of undefined
        'unicorn/no-null': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-new-array': 'off',
        'unicorn/no-array-reduce': 'off',

        // import sorting
        'sort-import': 'off',
        'import/order': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },

    overrides: [
        {
            files: ['tests/**/*.ts'],
            env: {
                jest: true,
            },
            plugins: ['jest'],
            extends: [
                'plugin:jest/recommended',
                'plugin:jest-formatting/recommended',
            ],
        },
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
        {
            files: ['*.d.ts'],
            rules: {
                'no-unused-vars': 'off',
                'no-use-before-define': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
            },
        },
        {
            files: ['*.ts', '*.vue'],
            rules: {
                'no-undef': 'off',
            },
        },
        {
            files: ['./*.js'],
            env: {
                node: true,
                browser: false,
                es6: false,
            },
            rules: {
                'unicorn/prefer-module': 'off',
            },
        },
    ],
}
