import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | code-snippet', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<CodeSnippet @name="dummy-index.hbs"/>`);

    assert.ok(
      this.element.textContent.includes(
        `<HeroHeader @addonName="Dummy Addon" />`
      )
    );
  });
});
