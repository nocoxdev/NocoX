import type { UiType } from '@/types';

export enum SortOrder {
  Ascending = 1,
  Descending,
}

export interface ISortItem {
  key: string;
  name: string;
  order: SortOrder;
}

export interface ISortTypeOption {
  value: SortOrder;
  label: React.ReactNode;
}

export interface ISortTypeConfig {
  types: UiType[];
  options: ISortTypeOption[];
}
