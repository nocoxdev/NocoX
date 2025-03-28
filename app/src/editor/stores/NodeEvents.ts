import { action, computed, makeObservable, observable } from 'mobx';
import type { NodeEvent } from '@/types';
import { generateKey } from '@/utils/helpers';
import type { PageNode } from './PageNode';

export class NodeEvents {
  readonly node: PageNode;

  @observable.shallow private _list: NodeEvent[] = [];

  constructor(node: PageNode, defaultEvents?: NodeEvent[]) {
    makeObservable(this);
    this.node = node;
    this.init(defaultEvents);
  }

  @action
  private init(defaultEvents?: NodeEvent[]) {
    this._list =
      defaultEvents ||
      (this.node.widget.events || []).map((item) => ({
        id: generateKey(item.name, '-'),
        name: item.name,
        actions: [],
      }));
  }

  @computed
  get list() {
    return this._list;
  }

  @action
  set(event: NodeEvent) {
    this._list = this._list.map((item) =>
      event?.name === item.name ? event : item,
    );

    this.node.page.history.set(this.node.page.jsonString);
  }
}
