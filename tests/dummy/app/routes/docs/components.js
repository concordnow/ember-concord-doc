// BEGIN-SNIPPET customize-route
import Route from '@ember/routing/route';

export default class DocsComponentsRoute extends Route {
  order = Infinity;
  title = 'Components';
  disabled = true;
}
// END-SNIPPET
