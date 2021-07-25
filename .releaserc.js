module.exports = {
    branches: [{name: 'main'}],
    plugins: [
        // determine release version
        '@semantic-release/commit-analyzer',
        // genereate notes
        '@semantic-release/release-notes-generator',
        // create / update changelog
        '@semantic-release/changelog',
        // update version number in package.json & package-lock.json
        [
            '@semantic-release/npm',
            {
                npmPublish: false,
            },
        ],
        // commit changes
        '@semantic-release/git',
    ],
}
