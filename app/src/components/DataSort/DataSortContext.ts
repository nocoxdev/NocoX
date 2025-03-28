import { createContext } from 'react';
import type { IDataField } from '@/types';
import type { ISortTypeConfig } from './type';

export interface DataSortContextType {
  size?: 'small' | 'middle' | 'large';
  fields: IDataField[];
  configs: ISortTypeConfig[];
}

export const DataSortContext = createContext<DataSortContextType>({} as any);
