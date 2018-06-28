'use strict';
module.exports = {
    webroot: '../docs',
    forceCleanWebroot: true, // Use if the webroot is outside the default project directory
    latestVersionPath: '',
    copyTasks: [
        {
            name: 'script-dependencies',
            sources: ['node_modules/prismjs/prism.js', // required by esds-doc
                        'node_modules/prismjs/components/prism-json.min.js', // required by esds-doc
                        'node_modules/prismjs/components/prism-scss.min.js', // required by esds-doc
                        'node_modules/prismjs/components/prism-twig.min.js', // required by esds-doc
                        'node_modules/svg4everybody/dist/svg4everybody.min.js',
                        'node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js',
                        'node_modules/scrollmonitor/scrollMonitor.js',
                        'node_modules/scrollmonitor/scrollMonitor.js.map',
                        `node_modules/esds-doc/dist/esds-doc.js`],
            destination: `../docs/scripts/dependencies`,
            watch: true
        },
        {
            name: 'spirit-styles',
            sources: [
                    'node_modules/spirit/dist/spirit.css',
                    'node_modules/esds-doc/dist/esds-doc.css', // required by esds-do,
                    'node_modules/prismjs/themes/prism.css'], // required by esds-doc
            destination: '../docs/styles/dependencies',
            watch: true
        }
    ],
    dependencies: [
        {
            moduleName: 'spirit'
        },
        {
            moduleName: 'esds-doc'
        }
    ]
};
