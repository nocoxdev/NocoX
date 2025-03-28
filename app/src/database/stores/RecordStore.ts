import { action, computed, makeObservable, observable } from 'mobx';
import {
  FilterConjunction,
  type IFilterInfo,
} from '@/components/DataFilter/type';
import type { ISortItem } from '@/components/DataSort/type';
import { AppDataApi } from '@/services/api';
import { BaseStore } from '@/stores';
import type { ArrayValues } from '@/types';
import type { Table } from './Table';

export interface QueryParams {
  keywords: string;
  filter?: IFilterInfo;
  sorts?: ISortItem[];
  pageIndex: number;
  pageSize: number;
  tableId: string;
}

const requestKeys = ['loadList', 'add', 'update', 'delete'] as const;

export class RecordStore extends BaseStore<ArrayValues<typeof requestKeys>> {
  readonly table: Table;

  @observable.shallow private _selectedRowIds: string[] = [];
  @observable.ref private _currentEditRecordId: string | null = null;
  @observable.shallow private _records: Record<string, any>[] = [];
  @observable.ref private _queryParams: QueryParams;

  @observable.ref private _totalCount = 0;

  constructor(table: Table) {
    super(requestKeys);
    makeObservable(this);

    this.table = table;

    this._queryParams = {
      keywords: '',
      filter: {
        conditions: [],
        conjunction: FilterConjunction.And,
      },
      sorts: [],
      pageIndex: 1,
      pageSize: 10,
      tableId: this.table.id,
    };
  }

  @computed
  get records(): Record<string, any>[] {
    return this._records;
  }

  @computed
  get selectedRecordKeys() {
    return this._selectedRowIds;
  }

  @computed
  get currentEditRecord() {
    return this.records.find(
      (item) => item[this.table.rowKeyName] === this._currentEditRecordId,
    );
  }

  @computed
  get queryParams() {
    return this._queryParams;
  }

  @computed
  get totalCount() {
    return this._totalCount;
  }

  @action
  setQueryParams(params: Partial<QueryParams>) {
    this._queryParams = { ...this._queryParams, ...params };
  }

  @action
  setCurrentEditRecordId(id?: string | null) {
    this._currentEditRecordId = id || null;
  }

  @action
  setSelectedRowIds(ids: string[]) {
    this._selectedRowIds = ids;
  }

  @action
  async loadRecords() {
    return (
      await this.request(this.requestKeys.loadList, AppDataApi.getPageList, {
        ...this._queryParams,
        filter: this._queryParams.filter,
      })
    )
      .finish(({ data }) => {
        if (!data) return;

        this._records = data.items;
        this._totalCount = data.totalCount;
      })
      .fail(() => {
        this._records = [];
        this._totalCount = 0;
      });
  }

  @action
  async insertRecord(data: Record<string, any>) {
    return (
      await this.request(
        this.requestKeys.add,
        AppDataApi.add,
        this.table.id,
        data,
      )
    ).finish(() => this.loadRecords());
  }

  @action
  async updateRecord(id: string, data: Record<string, any>) {
    return (
      await this.request(
        this.requestKeys.update,
        AppDataApi.update,
        this.table.id,
        id,
        data,
      )
    ).finish(() => {
      this._currentEditRecordId = null;
      this.loadRecords();
    });
  }

  @action
  async deleteRecord(ids: string[]) {
    return (
      await this.request(
        this.requestKeys.delete,
        AppDataApi.delete,
        this.table.id,
        ids,
      )
    ).finish(() => this.loadRecords());
  }
}
