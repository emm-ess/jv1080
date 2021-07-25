const path = require('path')
const LocalTrustChain = require('local-trust-chain')

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
    publicPath: '/',
    assetsDir: 'static/',
    crossorigin: 'anonymous',

    devServer: {
        open: true,
        https: LocalTrustChain(),
    },

    css: {
        loaderOptions: {
            sass: {
                additionalData: '@use \'@/sass/abstracts\' as *',
            },
        },
    },

    pluginOptions: {
        svgSprite: {
            dir: path.resolve(__dirname, 'src/assets/img/svg-sprite'),
            test: /\.(svg)(\?.*)?$/,
            loaderOptions: {
                extract: true,
                spriteFilename: 'static/img/svg-sprite.[hash:8].svg',
            },
            pluginOptions: {
                plainSprite: true,
            },
        },
        lintStyleOnBuild: true,
        stylelint: {
            fix: false,
            files: ['src/**/*.{vue,sass}'],
        },
    },

    chainWebpack: (config) => {
        config.module.rule('sideEffects').resourceQuery(/keep/).sideEffects(true)
        config.module
            .rule('svg-sprite')
            .use('svgo-loader')
            .loader('svgo-loader')
    },
}
