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
    }
  ]
};
