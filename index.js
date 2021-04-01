'use strict';

module.exports = {
  name: require('./package').name,

  contentFor(type, config) {
    if (
      type === 'head-footer' &&
      config.modulePrefix === 'dummy' &&
      config.environment != 'test'
    ) {
      return [
        'tailwindcss@^2.0/dist/base.min.css',
        'tailwindcss@^2.0/dist/components.min.css',
        '@tailwindcss/typography@^0.4/dist/typography.min.css',
        'tailwindcss@^2.0/dist/utilities.min.css',
      ]
        .map((css) => `<link href="https://unpkg.com/${css}" rel="stylesheet">`)
        .join('');
    }
  },
};
