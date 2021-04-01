import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('docs', function () {
    this.route('writing-doc');
    this.route('getting-started');
    this.route('customize-route');

    this.route('components', function () {
      this.route('hero-header');
      this.route('navbar');
      this.route('sidebar-nav');
      this.route('code-snippet');
    });
  });
});
