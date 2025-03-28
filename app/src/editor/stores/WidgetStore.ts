import { action, computed, makeObservable, observable } from 'mobx';
import { flattenWidgetProps } from '@/editor/codegen/props';
import groups from '@/editor/widgets';
import type { WidgetGroupConfig } from '@/types';
import { withWrapWidget } from '../hoc';

export class WidgetStore {
  @observable.ref private _groups: WidgetGroupConfig[] = [];

  constructor() {
    makeObservable(this);
    this.loadWidgets();
  }

  @computed
  get widgets() {
    return this._groups.flatMap((group) => group.widgets);
  }

  @computed
  get groups() {
    return this._groups;
  }

  @action
  find(name?: string) {
    return this.widgets.find((widget) => widget.name === name);
  }

  @action
  loadWidgets() {
    const hocGroups = groups.map((group) => ({
      ...group,
      widgets: group.widgets.map((widget) => ({
        ...widget,
        view: withWrapWidget(widget.view),
      })),
    }));
    this._groups = hocGroups;
  }

  getWidgetProps(name?: string) {
    const widget = this.find(name);
    return flattenWidgetProps(widget?.propGroups || []);
  }

  /**
   * serarch widgets
   * @param keywords keywords
   * @return
   **/
  search(keywords: string) {
    const result = this._groups.reduce((acc: WidgetGroupConfig[], group) => {
      const widgets = group.widgets.filter((widget) => {
        const { name, label, tags, showInExplorer } = widget;

        const condition =
          name.indexOf(keywords) > -1 ||
          label.indexOf(keywords) > -1 ||
          (tags ?? []).some((tag) => tag.indexOf(keywords) > -1);

        return showInExplorer && condition;
      });

      return widgets.length > 0 ? acc.concat({ ...group, widgets }) : acc;
    }, []);

    return result;
  }
}
