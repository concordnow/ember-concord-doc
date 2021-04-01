import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Service from '@ember/service';

/**
 * This is a very bare metal service to have introspection
 * on the underlying EmberApp.
 *
 * Inspired by:
 * https://github.com/emberjs/ember-inspector/blob/master/ember_debug/route-debug.js
 */
export default class IntrospectionService extends Service {
  @service router;

  @tracked
  routes = [];

  owner = getOwner(this);

  constructor() {
    super(...arguments);

    const router = this.router._router;
    // eslint-disable-next-line ember/no-private-routing-service
    const routerLib = router._routerMicrolib || router.router;
    let routeNames = routerLib.recognizer.names;

    this.routes = Object.entries(routeNames)
      .filter(([routeName]) => {
        if (routeName.match(/(loading|error)$/)) {
          return false;
        }
        return this.owner.hasRegistration(`route:${routeName}`);
      })
      .map(([routeName]) => ({
        routeName,
        ...this.owner.lookup(`route:${routeName}`),
      }));
  }
}
