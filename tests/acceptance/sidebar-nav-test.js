import { module, test } from 'qunit';
import { click, findAll, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | sidebar nav', function (hooks) {
  setupApplicationTest(hooks);

  test('test sidebar-nav links are ordered', async function (assert) {
    await visit('/docs');

    assert.equal(currentURL(), '/docs');

    const sidebarLinks = findAll('[data-test="sidebar-nav"] a');
    const sidebarLinksContent = sidebarLinks.map((l) => l.textContent.trim());

    assert.equal(sidebarLinksContent[0], 'Introduction');
    assert.equal(sidebarLinksContent[1], 'Getting Started');
    assert.equal(sidebarLinksContent[2], 'Writing documentation');
  });

  test('test sidebar-nav disabled links do not work', async function (assert) {
    await visit('/docs');

    assert.equal(currentURL(), '/docs');

    const sidebarLinks = findAll('[data-test="sidebar-nav"] a');
    const componentLink = sidebarLinks.find(
      (l) => l.textContent.trim() === 'Components'
    );

    assert.ok(componentLink.classList.contains('disabled'));

    await click(componentLink);

    assert.equal(currentURL(), '/docs');
  });

  test('test sidebar-nav links are ordered', async function (assert) {
    await visit('/docs');

    assert.equal(currentURL(), '/docs');

    const sidebarLinks = findAll('[data-test="sidebar-nav"] a');

    await click(sidebarLinks[2]);

    assert.equal(currentURL(), '/docs/writing-doc');
  });
});
