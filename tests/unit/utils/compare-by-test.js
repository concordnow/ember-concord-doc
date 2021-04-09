import compareBy from 'dummy/utils/compare-by';
import { module, test } from 'qunit';

module('Unit | Utility | compare-by', function () {
  test('less than', function (assert) {
    assert.equal(compareBy({ a: 1 }, { a: 3 }, 'a'), -1);
  });

  test('bigger than', function (assert) {
    assert.equal(compareBy({ a: 3 }, { a: 1 }, 'a'), 1);
  });

  test('equals', function (assert) {
    assert.equal(compareBy({ a: 1 }, { a: 1 }, 'a'), 0);
  });
});
