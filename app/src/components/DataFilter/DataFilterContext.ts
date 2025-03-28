import { createContext } from 'react';
import type { IDataField, IDataFieldGroup } from '@/types';

export interface DataFilterContextType {
  size?: 'small' | 'middle' | 'large';
  fields: (IDataField | IDataFieldGroup)[];
}

export const DataFilterContext = createContext<DataFilterContextType>(
  {} as any,
);
