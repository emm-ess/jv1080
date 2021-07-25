module.exports = {
    plugins: [
        require('cssnano')({
            preset: 'advanced',
        }),
        require('autoprefixer'),
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env'),
    ],
}
