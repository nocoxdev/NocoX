import { action, computed, makeObservable, observable } from 'mobx';
import type { TableResponse } from '@/services/responses';
import type { TableRowHeightType } from '@/types';
import { ColumnStore } from './ColumnStore';
import { RecordStore } from './RecordStore';

export class Table {
  readonly id: string;
  readonly rowKeyName: string;

  readonly recordStore;
  readonly columnStore;

  @observable.ref private _info: Omit<TableResponse, 'id'>;

  @observable.ref private _rowHeight: TableRowHeightType = 'small';

  constructor(id: string, rowKeyName: string, info: Omit<TableResponse, 'id'>) {
    makeObservable(this);
    this.id = id;
    this.rowKeyName = rowKeyName;
    this._info = info;
    this.recordStore = new RecordStore(this);
    this.columnStore = new ColumnStore(this);
  }

  @computed
  get info() {
    return {
      id: this.id,
      ...this._info,
    };
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
  get order() {
    return this._info.order;
  }

  @computed
  get rowHeight() {
    return this._rowHeight;
  }

  @action
  setRowHeight(rowHeight: TableRowHeightType) {
    this._rowHeight = rowHeight;
  }

  @action
  modify(info: Partial<Omit<TableResponse, 'id'>>) {
    this._info = { ...this._info, ...info };
  }
}
