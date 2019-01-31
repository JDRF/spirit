'use strict';
module.exports = {
  codeNamespace: "spirit",
  svgoConfig: {
    plugins: [{
      convertShapeToPath: false
    }, {
      convertPathData: false
    }, {
      removeAttrs: {
        attrs: ['stroke', 'class']
      }
    }]
  },
  copyTasks: [
    {
      name: 'fonts',
      sources: ["fonts/**/*"],
      destination: "_site/latest/fonts"
    },
    {
      name: 'images',
      sources: ["images/**/*"],
      destination: "_site/latest/images"
    },
    {
      name: "script-scustom",
      sources: ["scriptscustom/*.js"],
      destination: "_site/latest/scripts/scriptscustom"
    },
    {
      name: "script-dependencies",
      sources: ["node_modules/svg4everybody/dist/svg4everybody.min.js",
        "node_modules/inputmask/dist/inputmask/dependencyLibs/inputmask.dependencyLib.js",
        "node_modules/inputmask/dist/inputmask/inputmask.js",
        "node_modules/inputmask/dist/inputmask/inputmask.extensions.js",
        "node_modules/inputmask/dist/inputmask/inputmask.numeric.extensions.js",
        "node_modules/inputmask/dist/inputmask/inputmask.date.extensions.js"],
      destination: "_site/latest/scripts/dependencies"
    }
  ],
  additionalWatchTasks: ['watch:brushes:generate-brushes-sprite', 'watch:styles:minify']
};
