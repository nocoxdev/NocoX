import type { ReactNode } from 'react';
import type { MenuItemGroupType, MenuItemType } from 'antd/es/menu/interface';
import type { IFilterInfo } from '@/components/DataFilter/type';
import type { ISortItem } from '@/components/DataSort/type';
import type { UiType } from './table';

export type Direction = 'vertical' | 'horizontal';

export type Position = {
  x: number;
  y: number;
};

export type Offset = {
  left: number;
  top: number;
};

export type Size2D = {
  height: number;
  width: number;
};

export type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type Noop = (...args: any[]) => void;

export interface ValueLabel<T> {
  value: T;
  label: string;
}

export type DragType = 'add' | 'update';

export type DropPlacement = 'before' | 'after' | 'inner';

export type IndicatorPlacement = 'top' | 'right' | 'bottom' | 'left' | 'inner';

export enum OrderType {
  Asc,
  Desc,
}

export type EventType = 'listener' | 'trigger';
export type EventScope = 'app' | 'page' | 'inner';

export type IconType = 'all' | 'outline' | 'filled';

export interface IconValueType {
  name: string;
  content: string;
  title?: string;
  type?: IconType;
  category?: string;
  size?: string;
  color?: string;
  strokeWidth?: number;
  tags?: string[];
}

export interface TablerIconType {
  name: string;
  category: string;
  tags: string[];
  outline?: string;
  filled?: string;
}

export type MessageType = 'success' | 'info' | 'warning' | 'error';

export type AppRunningMode = 'edit' | 'preview' | 'production';

export enum ResourceType {
  Image = 1,
  Video = 2,
  Audio = 3,
  Document = 4,
  Other = 5,
}

export interface IDataFieldGroup {
  name: string;
  title: ReactNode;
  fields: IDataField[];
}

export interface IDataField {
  name: string;
  title: ReactNode;
  valueType: UiType;
  options?: ValueLabel<any>[];
}

export interface StateItem {
  name: string;
  value: any;
  title: ReactNode;
  valueType: UiType;
}

export interface AvailableStatesType {
  name: string;
  title: ReactNode;
  global?: boolean;
  items: StateItem[];
}

export type MergedMenuItemType = MenuItemType | MenuItemGroupType;

export interface QueryListParamsType {
  keywords?: string;
  filter?: IFilterInfo;
  sorts?: ISortItem[];
  [key: string]: any;
}

export interface QueryPageListParamsType extends QueryListParamsType {
  pageIndex: number;
  pageSize: number;
}
