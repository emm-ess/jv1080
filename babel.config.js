module.exports = {
    presets: [
        [
            '@vue/cli-plugin-babel/preset',
            {
                useBuiltIns: 'entry',
                corejs: '3.15',
            },
        ],
    ],
    env: {
        test: {
            plugins: ['istanbul'],
        },
    },
}
