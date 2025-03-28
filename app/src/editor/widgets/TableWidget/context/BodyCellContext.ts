import { createContext } from 'react';
import type { TableColumnProps } from '../ColumnWidget/View';

export interface BodyCellContextType {
  index: number;
  column: TableColumnProps<unknown>;
  record: Record<string, any>;
}

export const BodyCellContext = createContext<BodyCellContextType>({} as any);
