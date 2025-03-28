import type { UiType } from '@/types';
import type { BaseDataResponse } from './BaseResponse';

export interface ColumnRelation {
  tableId?: string | null;
  tableName?: string | null;
  displayColumnId?: string | null;
  displayColumnName?: string | null;
}

export interface TableColumnResponse extends BaseDataResponse {
  columnName: string;
  title: string;
  description: string;
  uiType: UiType;
  width: number;
  order: number;
  required: boolean;
  hidden?: boolean;
  system: boolean;
  primaryKey: boolean;
  relation?: ColumnRelation;
}
