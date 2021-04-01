import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hero-header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const addonName = 'dummyAddonName';
    this.set('addonName', addonName);

    await render(hbs`<HeroHeader @addonName={{this.addonName}} />`);

    assert.ok(this.element.textContent.includes(addonName));
  });
});
