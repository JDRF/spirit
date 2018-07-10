'use strict';
module.exports = {
  svgoConfig: {
      plugins: [
          {
              removeAttrs: {
                  attrs: 'stroke'
              }
          }
      ]
  },
  copyTasks: [
    {
      name: 'fonts',
      sources: ["fonts/**/*"],
      destination: "_site/latest/fonts"
    }
  ]
};
