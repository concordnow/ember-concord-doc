import isEqualRoute from 'dummy/utils/is-equal-route';
import { module, test } from 'qunit';

module('Unit | Utility | is-equal-route', function () {
  test('Same route', function (assert) {
    assert.ok(isEqualRoute('docs.index', 'docs.index'));
    assert.ok(isEqualRoute('docs', 'docs.index'));
    assert.ok(isEqualRoute('docs.index', 'docs'));
  });
  test('Different route', function (assert) {
    assert.notOk(isEqualRoute('docs.components.index', 'docs.index'));
    assert.notOk(isEqualRoute('docs.components', 'docs'));
    assert.notOk(isEqualRoute('docs', 'docs.components'));
  });
});
