module.exports = {
    // lint JS/TS-Code
    '*.{js,jsx,ts,tsx,vue,json}': ['prettier --write', 'eslint --cache --fix'],
    // check-types
    '*.{ts,tsx,vue}': () => ['npm run check-types'],
    // lint styles
    '*.{sass,vue}': ['stylelint --cache'],
    // optimize images
    '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged'],
    // lint everything, if dependencies got updated
    'package-lock.json': () => ['npm run lint', 'npm run check-types'],
}
