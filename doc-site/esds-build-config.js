'use strict';
module.exports = {
    webroot: '../docs',
    forceCleanWebroot: true, // Use if the webroot is outside the default project directory
    latestVersionPath: '',
    includeMarkdownWrapper: true,
    markdownWrapperClass: 'spirit-long-form-text',
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
                'node_modules/esds-doc/dist/esds-doc.js',
                'node_modules/a11y-dialog/a11y-dialog.min.js',
                'node_modules/inputmask/dist/inputmask/dependencyLibs/inputmask.dependencyLib.js',
                'node_modules/inputmask/dist/inputmask/inputmask.js',
                'node_modules/inputmask/dist/inputmask/inputmask.extensions.js',
                'node_modules/inputmask/dist/inputmask/inputmask.numeric.extensions.js',
                'node_modules/inputmask/dist/inputmask/inputmask.date.extensions.js'],
            destination: `../docs/scripts/dependencies`,
            watch: true
        },
        {
            name: 'spirit-styles',
            sources: [
                'node_modules/@jdrfhq/spirit/dist/spirit.css',
                'node_modules/@jdrfhq/spirit/dist/spirit.min.css',
                'node_modules/prismjs/themes/prism.css'], // required by esds-doc
            destination: '../docs/styles',
            watch: true
        },
        {
            name: 'spirit-scripts',
            sources: [
                'node_modules/@jdrfhq/spirit/dist/*.js'],
            destination: '../docs/scripts/dependencies',
            watch: true
        },
        {
            name: 'spirit-icon',
            sources: [
                'node_modules/@jdrfhq/spirit/dist/spirit.svg'],
            destination: '../docs/icons',
            watch: true
        },
        {
            name: 'spirit-brushes',
            sources: [
                'node_modules/@jdrfhq/spirit/dist/spirit-brushes.svg'],
            destination: '../docs/brushes',
            watch: true
        },
        {
            name: 'spirit-fonts',
            sources: [
                'node_modules/@jdrfhq/spirit/fonts/**/*'],
            destination: '../docs/fonts',
            watch: true
        },
        {
            name: 'spirit-icon-data',
            sources: [
                'node_modules/@jdrfhq/spirit/data/icons.json'],
            destination: 'data',
            rename: 'spirit_icons.json',
            watch: true
        }
    ],
    dependencies: [
        {
            moduleName: '@jdrfhq/spirit'
        },
        {
            moduleName: 'esds-doc'
        }
    ],
    autoprefixerOptions: {
        browsers: ['last 2 versions', 'ie 11'],
        grid: true
    },
    manageNunjucksEnv: function (env) {
        // Adding some custom nunjucks filters for the doc site
        env.addFilter('split', function (str, seperator) {
            return str.split(seperator);
        });

        env.addFilter('push', function (arr, value) {
            return arr.push(value);
        });

        env.addFilter('isstring', function (obj) {
            return typeof obj === 'string';
        });

        env.addFilter('isnumber', function (obj) {
            return typeof obj === 'number';
        });

        env.addFilter('hextorgb', function (string) {
          const regex = /#[0-9a-fA-F]{6}/gm;
          let m;

          while ((m = regex.exec(string)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((hex, groupIndex) => {
              let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
              rgb = rgb ? {
                  r: parseInt(rgb[1], 16),
                  g: parseInt(rgb[2], 16),
                  b: parseInt(rgb[3], 16)
              } : null;

              const hexRegex = new RegExp(hex, 'g');
              string = string.replace(new RegExp(hex, 'g'), `${rgb.r},${rgb.g},${rgb.b}`);
            });
          }

          return string;
        });
    }
};
