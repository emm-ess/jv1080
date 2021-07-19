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

    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
        'plugin:eslint-comments/recommended',
        'plugin:json/recommended',
        'plugin:compat/recommended',
    ],

    rules: {
        // TODO:
        // this rule should not be turned of for master
        'no-console': 'off',
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
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
        quotes: ['error', 'single'],
        'prettier/prettier': ['off'],
    },

    overrides: [
        {
            files: ['tests/**/*.ts'],
            env: {
                jest: true,
            },
            plugins: ['jest'],
            extends: ['plugin:jest/recommended'],
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
                'no-use-before-define': 'off',
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
        },
    ],
}
