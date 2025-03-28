import { action, computed, makeObservable, observable } from 'mobx';
import { DatabaseApi } from '@/services/api';
import type { TableResponse } from '@/services/responses';
import { BaseStore } from '@/stores';
import type { ArrayValues } from '@/types';
import { Table } from './Table';

const requestKeys = ['loadList', 'add', 'update', 'delete', 'reorder'] as const;

export class TableStore extends BaseStore<ArrayValues<typeof requestKeys>> {
  readonly rowKeyName: string;

  @observable.shallow private _tables: Table[] = [];
  @observable.ref private _current: Table | undefined;

  constructor(rowKeyName: string) {
    super(requestKeys);
    makeObservable(this);
    this.rowKeyName = rowKeyName;
    this.loadTables();
  }

  @computed
  get tables() {
    return this._tables.slice().sort((a, b) => a.order - b.order);
  }

  @computed
  get current() {
    return this._current;
  }

  @action
  setCurrent(id?: string) {
    if (id === this._current?.id) {
      return;
    }

    const table = this._tables.find((item) => item.id === id);
    table?.columnStore.loadColumns();
    table?.recordStore.loadRecords();

    this._current = table;
  }

  @action
  async loadTables() {
    return (
      await this.request(this.requestKeys.loadList, DatabaseApi.getTableList)
    ).finish(({ data }) => {
      if (data) {
        this._tables = data.map(
          (item) => new Table(item.id, this.rowKeyName, item),
        );
        this.current?.id || this.setCurrent(this.tables[0]?.id);
      }
    });
  }

  @action
  async updateTable(id: string, data: Omit<TableResponse, 'id' | 'order'>) {
    return (
      await this.request(this.requestKeys.update, DatabaseApi.updateTable, {
        id,
        ...data,
      })
    ).finish(() => {
      const table = this._tables.find((item) => item.id === id);
      table?.modify(data);
      this._tables = this.tables;
    });
  }

  @action
  async createTable(data: Omit<TableResponse, 'id' | 'order'>) {
    return (
      await this.request(
        this.requestKeys.add,
        DatabaseApi.createTable,

        data,
      )
    ).finish(() => {
      this.loadTables();
    });
  }

  @action
  async reorderTable(tableId: string, toIndex: number) {
    const table = this._tables.find((item) => item.id === tableId);
    if (!table || table.order === toIndex) {
      return { success: true, message: '' };
    }

    this._tables.forEach((item) => {
      let { order } = item;

      if (table.order > toIndex) {
        if (order >= toIndex && order < table.order) {
          order += 1;
        }
      } else {
        if (order <= toIndex && order > table.order) {
          order -= 1;
        }
      }

      item.modify({ order });
    });

    table.modify({ order: toIndex });

    return (
      await this.request(
        this.requestKeys.reorder,
        DatabaseApi.reorderTable,
        tableId,
        toIndex,
      )
    ).fail(() => {
      this.loadTables();
    });
  }

  @action
  async deleteTable(id: string) {
    return (
      await this.request(this.requestKeys.delete, DatabaseApi.deleteTable, id)
    ).finish(() => {
      this._tables = this.tables.filter((item) => item.id !== id);
      this.setCurrent(this.tables[0]?.id);
    });
  }
}
