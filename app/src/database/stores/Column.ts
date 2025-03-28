import { action, computed, makeObservable, observable } from 'mobx';
import type { TableColumnInfo } from '@/types';

export class Column {
  readonly id: string;

  @observable.ref private _info: TableColumnInfo;

  constructor(id: string, info: TableColumnInfo) {
    makeObservable(this);
    this.id = id;
    this._info = info;
  }

  @computed
  get info() {
    return {
      id: this.id,
      ...this._info,
    };
  }

  @computed
  get columnName() {
    return this._info.columnName;
  }

  @computed
  get title() {
    return this._info.title;
  }

  @computed
  get description() {
    return this._info.description;
  }

  @computed
  get uiType() {
    return this._info.uiType;
  }

  @computed
  get required() {
    return this._info.required;
  }

  @computed
  get order() {
    return this._info.order;
  }

  @computed
  get width() {
    return this._info.width;
  }

  @computed
  get hidden() {
    return this._info.hidden;
  }

  @action
  hide() {
    this.modify({ hidden: true });
  }

  @action
  show() {
    this.modify({ hidden: false });
  }

  @action
  resize(width: number) {
    this.modify({ width });
  }

  @action
  modify(info: Partial<TableColumnInfo>) {
    this._info = { ...this._info, ...info };
  }
}
