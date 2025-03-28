import { isFunction } from 'lodash-es';
import { action, computed, makeObservable, observable } from 'mobx';
import type { AppRunningMode, NodeProp } from '@/types';
import { flattenWidgetProps } from '../codegen/props';
import type { PageNode } from './PageNode';

export class NodeProps {
  readonly node: PageNode;

  @observable.shallow private _list: NodeProp[] = [];

  constructor(node: PageNode, defaultProps: Record<string, any>) {
    makeObservable(this);
    this.node = node;
    this.init(defaultProps);
  }

  @computed
  get flatPropConfigs() {
    return flattenWidgetProps(this.node.widget.propGroups || []);
  }

  @computed
  get list() {
    return this._list;
  }

  @computed
  get record(): Record<string, any> {
    return this._list.reduce((acc, prop) => {
      return { ...acc, [prop.name]: prop.value };
    }, {});
  }

  @computed
  get editing(): Record<string, any> {
    return this.getComputedProps('edit');
  }

  @computed
  get producting(): Record<string, any> {
    return this.getComputedProps('production');
  }

  @action
  set(name: string, value: any) {
    this._list = this._list.map((prop) =>
      prop.name === name ? { ...prop, value } : prop,
    );

    this.node.page.history.set(this.node.page.jsonString);
  }

  getConfig(name: string) {
    return this.flatPropConfigs.find((config) => config.name === name);
  }

  @action
  private init(defaultProps: Record<string, any>) {
    this._list = this.flatPropConfigs.map((item) => {
      const { name, defaultValue, label, pName } = item;
      const value = name in defaultProps ? defaultProps[name] : defaultValue;

      return {
        pName,
        name,
        value,
        label,
        config: item,
      };
    });
  }

  private getComputedProps(mode: AppRunningMode) {
    return this.list.reduce((acc, prop) => {
      const config = this.getConfig(prop.name);

      if (config?.assist || (config?.mode && mode !== config?.mode)) return acc;

      const computedFn = () => {
        const args = {
          prop,
          props: this.record,
          node: this.node,
          page: this.node.page,
          app: this.node.page.app,
        };

        const computed = config?.computed?.[mode] || config?.computed?.default;

        return isFunction(computed)
          ? computed(args)
          : { [prop.name]: prop.value };
      };

      return { ...acc, ...computedFn() };
    }, {});
  }
}
