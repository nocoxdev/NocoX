import { action, computed, makeObservable, observable } from 'mobx';
import { AppDataApi, DatabaseApi } from '@/services/api';
import { BaseStore } from '@/stores';
import type { ArrayValues, TableColumnInfo } from '@/types';
import { Column } from './Column';
import type { Table } from './Table';

const requestKeys = [
  'loadList',
  'hide',
  'show',
  'reorder',
  'add',
  'update',
  'delete',
  'resized',
  'getDataCount',
] as const;

export class ColumnStore extends BaseStore<ArrayValues<typeof requestKeys>> {
  readonly table: Table;

  @observable.ref private _columns: Column[] = [];

  constructor(table: Table) {
    super(requestKeys);
    makeObservable(this);
    this.table = table;
    this.loadColumns();
  }

  @computed
  get columns() {
    return this._columns.slice().sort((a, b) => a.order - b.order);
  }

  @computed
  get sysColumns() {
    return this._columns.filter((item) => item.info.system);
  }

  @action
  resizeColumn(id: string, width: number) {
    const column = this._columns.find((item) => item.id === id);
    column?.resize(width);
  }

  @action
  async hideColumns(ids: string[]) {
    this._columns
      .filter((item) => ids.includes(item.id))
      .forEach((item) => item.hide());
    return await this.request(
      this.requestKeys.hide,
      DatabaseApi.hideTableColumn,
      ids,
    );
  }

  @action
  async showColumns(ids: string[]) {
    this._columns
      .filter((item) => ids.includes(item.id))
      .forEach((item) => item.show());
    return await this.request(
      this.requestKeys.show,
      DatabaseApi.showTableColumn,
      ids,
    );
  }

  @action
  async reorderColumn(id: string, toIndex: number) {
    const column = this._columns.find((item) => item.id === id);

    if (!column || column.order === toIndex) {
      return;
    }

    this._columns.forEach((item) => {
      let { order } = item;

      if (column.order > toIndex) {
        if (order >= toIndex && order < column.order) {
          order += 1;
        }
      } else {
        if (order <= toIndex && order > column.order) {
          order -= 1;
        }
      }

      item.modify({ order });
    });

    column.modify({ order: toIndex });

    return await this.request(
      this.requestKeys.reorder,
      DatabaseApi.reorderTableColumn,
      id,
      toIndex,
    );
  }

  @action
  async loadColumns() {
    return (
      await this.request(
        this.requestKeys.loadList,
        DatabaseApi.getTableColumns,
        this.table.id,
      )
    ).finish(({ data }) => {
      this._columns = data?.map((item) => new Column(item.id, item)) || [];
    });
  }

  @action
  async addColumn(data: Omit<TableColumnInfo, 'system' | 'primaryKey'>) {
    return (
      await this.request(this.requestKeys.add, DatabaseApi.addTableColumn, {
        tableId: this.table.id,
        columnName: data.columnName,
        title: data.title,
        uiType: data.uiType,
        required: data.required,
      })
    ).finish(() => this.loadColumns());
  }

  @action
  async updateColumn(
    id: string,
    data: Omit<TableColumnInfo, 'system' | 'primaryKey'>,
  ) {
    return (
      await this.request(
        this.requestKeys.update,
        DatabaseApi.updateTableColumn,
        {
          id,
          columnName: data.columnName,
          title: data.title,
          uiType: data.uiType,
          required: data.required,
        },
      )
    ).finish(() => {
      const column = this._columns.find((item) => item.id === id);
      column?.modify(data);
    });
  }

  @action
  async deleteColumn(id: string) {
    return (
      await this.request(
        this.requestKeys.delete,
        DatabaseApi.deleteTableColumn,
        id,
      )
    ).finish(() => {
      this._columns = this._columns.filter((item) => item.id !== id);
      this.table.recordStore.loadRecords();
    });
  }

  @action
  async resizedColumn(id: string, width: number) {
    return (
      await this.request(
        this.requestKeys.resized,
        DatabaseApi.resizeTableColumn,
        id,
        width,
      )
    ).fail(() => {
      this.loadColumns();
    });
  }

  @action
  async getDataCount() {
    return await this.request(
      this.requestKeys.getDataCount,
      AppDataApi.getDataCount,
      {
        tableId: this.table.id,
      },
    );
  }
}
