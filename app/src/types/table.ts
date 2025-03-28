import type { ComponentType } from 'react';
import type { IconProps } from '@tabler/icons-react';
import type { SortOrder } from '@/components/DataSort/type';
import type { TableColumnResponse } from '@/services/responses';

export type TableColumnInfo = Omit<TableColumnResponse, 'id'>;

export enum UiType {
  Id = 1,
  Bool,
  SingleText,
  LongText,
  Integer,
  Decimal,
  Time,
  Date,
  DateTime,
  Percent,
  Image,
  Attachment,
  Relation,
  User,
  CreatedTime,
  CreatedBy,
  LastModifiedTime,
  LastModifiedBy,
  DeletedBy,
  DeletedTime,
  IsDeleted,
}

export interface SortType {
  key: string;
  column: string;
  order: SortOrder;
}

export type ColumnConfig = {
  type: UiType;
  title: string;
  system?: boolean;
  primaryKey?: boolean;
  disabled?: boolean;
  icon: ComponentType<IconProps>;
  formComponent: ComponentType<ValueComponentProps & Record<string, any>>;
  renderCell: (
    value?: any,
    record?: Record<string, any>,
    column?: TableColumnInfo,
    index?: number,
  ) => React.ReactNode;
};

export interface ValueComponentProps {
  readonly?: boolean;
  value?: any;
  defaultValue?: any;
  onChange?: (val: any) => void;
}

export type TableRowHeightType = 'small' | 'medium' | 'large';
