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

  included(includer) {
    if (includer.parent) {
      throw new Error(
        `ember-concord-doc should be in your package.json's devDependencies`
      );
    } else if (includer.name === this.project.name()) {
      throw new Error(
        `ember-concord-doc cannot be used to document an application`
      );
    }

    if (!includer.options.snippetSearchPaths) {
      includer.options.snippetSearchPaths = ['addon', 'tests/dummy/app'];
    }
    if (!includer.options['ember-prism']) {
      includer.options['ember-prism'] = {};
    }

    if (!includer.options['ember-prism'].theme) {
      includer.options['ember-prism'].theme = 'tomorrow';
    }

    if (!includer.options['ember-prism'].components) {
      includer.options['ember-prism'].components = [
        'markup',
        'markup-templating',
        'handlebars',
        'javascript',
        'css',
      ];
    }

    if (!includer.options['ember-md-block']) {
      includer.options['ember-md-block'] = {};
    }

    if (!includer.options['ember-md-block'].wrapper) {
      includer.options['ember-md-block'].wrapper = {};
    }

    if (!includer.options['ember-md-block'].wrapper.begin) {
      includer.options['ember-md-block'].wrapper.begin =
        '<div class="prose max-w-none">';
    }

    if (!includer.options['ember-md-block'].wrapper.end) {
      includer.options['ember-md-block'].wrapper.end = '</div>';
    }

    this._super.included.apply(this, arguments);
  },
};
