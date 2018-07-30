'use strict';
module.exports = {
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
        name: "script-dependencies",
        sources: ["node_modules/svg4everybody/dist/svg4everybody.min.js"],
        destination: "_site/latest/scripts/dependencies"
    }
  ]
};
