import { action, computed, makeObservable, observable } from 'mobx';
import { BlockApi } from '@/services/api';
import type { BlockResponse } from '@/services/responses';
import { BaseStore } from '@/stores';
import type { ArrayValues, BlockType } from '@/types';

const requestKeys = ['loadList', 'delete'] as const;

export class BlockStore extends BaseStore<ArrayValues<typeof requestKeys>> {
  @observable.shallow private _blocks: BlockResponse[] = [];
  @observable.ref _total = 0;
  @observable.ref _pageIndex = 1;

  constructor() {
    super(requestKeys);
    makeObservable(this);
  }

  @computed
  get blocks() {
    return this._blocks;
  }

  @computed
  get total() {
    return this._total;
  }

  @computed
  get hasMore() {
    return this._total > this._blocks.length;
  }

  @action
  async fetch(type: BlockType, keywords: string, reset?: boolean) {
    if (reset) {
      this._pageIndex = 1;
    }

    const queries = {
      pageIndex: this._pageIndex,
      pageSize: 3,
      type,
      keywords,
    };

    return (
      await this.request(
        this.requestKeys.loadList,
        BlockApi.getPageList,
        queries,
      )
    ).finish(({ data }) => {
      if (!data) return;

      this._total = data.totalCount;
      this._blocks = reset ? data.items : this._blocks.concat(data.items);
      this._pageIndex = this._pageIndex + 1;
    });
  }
}
