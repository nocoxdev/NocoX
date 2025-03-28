import { keys, uniq } from 'lodash-es';
import { action, computed, makeObservable, observable } from 'mobx';
import type {
  AvailableStatesType,
  NodeEvent,
  PageNodeJson,
  WidgetTypeConfig,
} from '@/types';
import type { App } from './App';
import type { AppPage } from './AppPage';
import { NodeEvents } from './NodeEvents';
import { NodeProps } from './NodeProps';
import { NodeStyles } from './NodeStyles';

export class PageNode {
  readonly id: string;
  readonly name: string;
  readonly attrName: string;
  readonly widget: WidgetTypeConfig;
  readonly page: AppPage;
  readonly app: App;
  readonly props: NodeProps;
  readonly styles: NodeStyles;
  readonly events: NodeEvents;

  @observable private _visible: boolean = true;
  @observable private _index: number = 0;
  @observable private _pid: string = '';
  @observable private _customLabel: string | undefined = undefined;

  @observable.shallow private _states: AvailableStatesType[] = [];
  @observable.ref private _attachedParams: Record<string, any> = {};

  constructor(
    app: App,
    page: AppPage,
    id: string,
    pid: string,
    index: number,
    widget: WidgetTypeConfig,
    attrName: string,
    label: string | undefined,
    visible: boolean | undefined,
    defaultProps: Record<string, any> = {},
    defaultStyles: Record<string, any> = {},
    defaultEvents: NodeEvent[] | undefined,
  ) {
    makeObservable(this);

    this.app = app;
    this.page = page;
    this.id = id;
    this._pid = pid;
    this._index = index;
    this.widget = widget;
    this.attrName = attrName;
    this.name = widget.name;
    this._customLabel = label;
    this._visible = visible || true;

    this.events = new NodeEvents(this, defaultEvents);
    this.props = new NodeProps(this, defaultProps);
    this.styles = new NodeStyles(this, defaultStyles);
  }

  @computed
  get visible() {
    return this._visible;
  }

  @computed
  get customLabel() {
    return this._customLabel;
  }

  @computed
  get label() {
    return this._customLabel || this.widget.label;
  }

  @computed
  get index() {
    return this._index;
  }

  @computed
  get pid() {
    return this._pid;
  }

  @computed
  get states() {
    return this._states;
  }

  @computed
  get actions() {
    return this.widget.actions
      ?.map((item) => this.app.actions.find((action) => action.name === item))
      .filter((item) => !!item);
  }

  @computed
  get dataName() {
    return this.props.producting['dataName'];
  }

  @computed
  get children() {
    return this.page.nodes
      .filter((node) => node._pid === this.id)
      .sort((a, b) => a.index - b.index);
  }

  @computed
  get attachedParams() {
    return this._attachedParams;
  }

  @computed
  get mergedAttachedParams() {
    // from root to current, merge params,use cloest params
    return this.ancestors
      .reverse()
      .concat(this)
      .reduce((acc, item) => {
        return { ...acc, ...item.attachedParams };
      }, {}) as Record<string, any>;
  }

  @computed
  get errors() {
    return this.props.list.reduce((acc: string[], item) => {
      const args = {
        prop: { name: item.name, value: item.value },
        props: this.props.record,
        node: this,
        page: this.page,
        app: this.app,
      };

      const validation = item.config?.validate
        ? item.config.validate(args)
        : undefined;

      if (validation?.success === false) {
        return acc.concat(`${item.label}: ${validation?.message}`);
      }

      return acc;
    }, []);
  }

  @computed
  get parent() {
    return this.page.nodes.find((node) => node.id === this._pid);
  }

  @computed
  get ancestorsIsHidden() {
    return this.ancestors.some((item) => item.visible === false);
  }

  @computed
  get ancestors() {
    const ancestors: PageNode[] = [];

    let node = this.parent;
    while (node) {
      ancestors.push(node);
      node = node.parent;
    }
    return ancestors.reverse();
  }

  @computed
  get contextStates() {
    return this.page.nodes.flatMap((node) => {
      if (this.ancestors.map((item) => item.id).includes(node.id)) {
        return node.states;
      } else {
        return node.states.filter((item) => item.global);
      }
    });
  }

  getCbArgs(propName: string) {
    const prop = {
      name: propName,
      value: this.props.record[propName],
    };

    return {
      prop,
      props: this.props.record,
      node: this,
      page: this.page,
      app: this.app,
    };
  }

  @action
  setStates(s: AvailableStatesType) {
    this._states = this._states.map((state) => {
      if (state.name === s.name) {
        return s;
      } else {
        return state;
      }
    }, []);

    if (!this._states.find((item) => item.name === s.name)) {
      this._states = this._states.concat(s);
    }
  }

  @action
  transferParams(params?: Record<string, any>) {
    this._attachedParams = { ...this._attachedParams, ...params };
  }

  @action
  clearParams() {
    this._attachedParams = {};
  }

  @computed
  get elements(): Record<string, PageNode[]> {
    const names = this.children
      .filter((item) => item.pid === this.id)
      .map((item) => item.attrName);

    return uniq(names).reduce((acc, item) => {
      return {
        ...acc,
        [item]: this.children
          .filter((node) => node.pid === this.id && node.attrName === item)
          .sort((a, b) => a.index - b.index),
      };
    }, {});
  }

  @computed
  get descendants() {
    let descendants: PageNode[] = [];

    let nodes = this.children;
    while (nodes.length > 0) {
      descendants = descendants.concat(nodes);
      nodes = nodes.flatMap((node) => node.children);
    }
    return descendants;
  }

  @computed
  get json(): PageNodeJson {
    return {
      name: this.name,
      label: this.customLabel,
      id: this.id,
      visible: this.visible,
      props: this.props.record,
      styles: this.styles.record,
      events: this.events.list,
      elements: {
        ...keys(this.elements).reduce(
          (acc: Record<string, PageNodeJson[]>, key) => {
            return {
              ...acc,
              [key]: this.elements[key].map((node) => node.json),
            };
          },
          {},
        ),
      },
    };
  }

  getAncestorByName(name: string) {
    let node = this.parent;

    while (node) {
      if (node.name === name) {
        return node;
      }

      node = node.parent;
    }
  }

  getDescendantByName(name: string) {
    return this.descendants.filter((item) => item.name === name);
  }

  @action
  changeIndex(index: number, pid?: string) {
    if (pid) {
      this._pid = pid;
    }

    this._index = index;
  }

  @action
  toggleVisble() {
    this._visible = !this._visible;
  }

  @action
  changeCustomLabel(label: string) {
    this._customLabel = label;
  }
}
