import { keys } from 'lodash-es';
import { action, computed, makeObservable, observable } from 'mobx';
import type { NodeStyle } from '@/types';
import { flattenWidgetStyles } from '../codegen/props';
import type { PageNode } from './PageNode';

export class NodeStyles {
  readonly node: PageNode;

  @observable.shallow private _list: NodeStyle[] = [];

  constructor(node: PageNode, defaultStyles: Record<string, any>) {
    makeObservable(this);
    this.node = node;

    this.init(defaultStyles);
  }

  @computed
  get list() {
    return this._list;
  }

  @computed
  get record(): Record<string, any> {
    return this._list.reduce((acc, style) => {
      return { ...acc, [style.name]: style.value };
    }, {});
  }

  @computed
  get producting(): Record<string, any> {
    return keys(this.record).reduce(
      (acc, key) => ({ ...acc, ...this.record[key] }),
      {},
    );
  }

  @action
  set(name: string, value: any) {
    this._list = this._list.map((style) => {
      return style.name === name ? { ...style, value } : style;
    });
    this.node.page.history.set(this.node.page.jsonString);
  }

  @action
  private init(defaultStyles: Record<string, any>) {
    this._list = flattenWidgetStyles(this.node.widget?.styleGroups ?? []).map(
      (item) => {
        const initValue =
          item.name in defaultStyles
            ? defaultStyles[item.name]
            : item.defaultValue;
        return {
          pName: item.pName,
          name: item.name,
          defaultValue: item.defaultValue,
          value: initValue,
          label: item.label,
        };
      },
    );
  }
}
