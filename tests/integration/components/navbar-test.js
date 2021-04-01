import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const addonName = 'dummyAddonName';
    const repo = 'https://github.com/repo/addon';
    this.set('addonName', addonName);
    this.set('repo', repo);

    await render(
      hbs`<Navbar @addonName={{this.addonName}} @repo={{this.repo}} />`
    );

    assert.ok(this.element.textContent.includes(addonName));

    assert.equal(findAll(`[href='${repo}']`).length, 1);
  });
});
