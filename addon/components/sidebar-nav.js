import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import isEqualRoute from 'ember-concord-doc/utils/is-equal-route';
import compareBy from 'ember-concord-doc/utils/compare-by';

export default class SidebarNavComponent extends Component {
  @service introspection;
  @service router;

  get explicitDocsRoutes() {
    return this.introspection.routes
      .filter(({ routeName }) => routeName.startsWith('docs'))
      .filter(({ routeName }) => {
        return routeName !== 'application';
      })
      .map((route) => ({
        ...route,
        isActive: isEqualRoute(route.routeName, this.router.currentRouteName),
      }))
      .sort((a, b) => compareBy(a, b, 'routeName'));
  }

  get docsPages() {
    let tree = [];
    this.explicitDocsRoutes.reduce(
      (r, o) => {
        o.routeName
          .split('.')
          .map((_, i, a) => a.slice(0, i + 1).join('.'))
          .reduce((q, routeName, i, { length }) => {
            var temp = (q.children = q.children || []).find(
              (p) => p.routeName === routeName
            );
            if (!temp) {
              q.children.push((temp = { routeName, disabled: true }));
            }
            if (i + 1 === length) {
              Object.assign(temp, o, { disabled: o.disabled });
            }
            q.children.sort((a, b) => compareBy(a, b, 'order'));
            return temp;
          }, r);
        return r;
      },
      { children: tree }
    );
    return tree[0].children;
  }

  @tracked
  isOpen = false;

  @action
  toggle() {
    this.isOpen = !this.isOpen;
  }

  @action
  handleSidebarClick(event) {
    if (this.isOpen) {
      const target = event.target;

      if (['A', 'svg', 'path'].includes(target.tagName)) {
        let parentElement = target;

        if (target.tagName == 'path') {
          parentElement = target.parentElement?.closest('svg')?.parentElement;
        } else if (target.tagName == 'svg') {
          parentElement = target.parentElement;
        }

        if (
          parentElement &&
          parentElement.hasAttribute('data-ignore-auto-close')
        ) {
          return;
        }

        this.toggle();
      }
    }
  }
}
