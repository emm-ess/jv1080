const path = require('path')

module.exports = {
    publicPath: '/',
    assetsDir: 'static/',
    crossorigin: 'anonymous',

    devServer: {
        open: true,
    },

    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import \'@/sass/abstracts\'',
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
    },
}
