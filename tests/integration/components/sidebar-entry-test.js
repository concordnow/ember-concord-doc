import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sidebar-entry', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders entry', async function (assert) {
    const page = {
      routeName: 'index',
      title: 'Foobar',
      children: [],
      disabled: false,
    };
    this.set('page', page);
    await render(hbs`<SidebarEntry class="foo" @page={{this.page}}/>`);

    assert.equal(find('a').textContent.trim(), 'Foobar');
    assert.ok(find('li').classList.contains('foo'));
  });

  test('it renders disabled entry', async function (assert) {
    const page = {
      routeName: 'index',
      title: 'Foobar',
      children: [],
      disabled: true,
    };
    this.set('page', page);
    await render(hbs`<SidebarEntry @page={{this.page}}/>`);

    assert.equal(find('a.disabled').textContent.trim(), 'Foobar');
  });

  test('it renders entry with children', async function (assert) {
    const page = {
      routeName: 'index',
      title: 'Foo',
      children: [
        {
          routeName: 'index',
          title: 'Bar',
          disabled: false,
        },
        {
          routeName: 'index',
          title: 'Baz',
          disabled: false,
        },
      ],
      disabled: false,
    };
    this.set('page', page);
    await render(hbs`<SidebarEntry @page={{this.page}}/>`);

    const links = findAll('a');
    const linkContents = links.map((l) => l.textContent.trim());
    assert.equal(links.length, 3);
    assert.ok(linkContents.includes('Foo'));
    assert.ok(linkContents.includes('Bar'));
    assert.ok(linkContents.includes('Baz'));
  });
});
