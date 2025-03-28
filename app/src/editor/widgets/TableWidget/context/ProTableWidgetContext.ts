import { createContext } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { IFilterInfo } from '@/components/DataFilter/type';
import type { ISortItem } from '@/components/DataSort/type';
import type { TableColumnProps } from '../ColumnWidget/View';

export interface ProTableWidgetContextType {
  rowKey?: string;
  size?: SizeType;
  columns?: TableColumnProps<any>[];
  secondaryFilter?: IFilterInfo;
  primaryFilter?: IFilterInfo;
  sorts?: ISortItem[];
  keywords?: string;
  setSecondaryFilter: React.Dispatch<
    React.SetStateAction<IFilterInfo | undefined>
  >;
  setPrimaryFilter: React.Dispatch<
    React.SetStateAction<IFilterInfo | undefined>
  >;
  setSorts: React.Dispatch<React.SetStateAction<ISortItem[] | undefined>>;
  setKeywords: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ProTableWidgetContext = createContext<ProTableWidgetContextType>(
  {} as any,
);
