import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | introspection', function (hooks) {
  setupTest(hooks);

  // disabled because:
  // - it fails on ember-lts-3.20
  // - introspection is partially tests with acceptance tests
  skip('it lookup routes', function (assert) {
    let service = this.owner.lookup('service:introspection');

    const loadingRoutes = service.routes.filter((r) =>
      r.routeName.includes('loading')
    );
    const errorRoutes = service.routes.filter((r) =>
      r.routeName.includes('error')
    );
    const applicationRoutes = service.routes.filter((r) =>
      r.routeName.includes('application')
    );

    assert.equal(loadingRoutes.length, 0);
    assert.equal(errorRoutes.length, 0);
    assert.equal(applicationRoutes.length, 0);
    assert.equal(service.routes.length, 10);
  });
});
