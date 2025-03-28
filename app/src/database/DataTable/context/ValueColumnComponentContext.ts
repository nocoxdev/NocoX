import { createContext } from 'react';
import type { TableColumnResponse } from '@/services/responses';

export interface ValueColumnComponentContextType {
  column: TableColumnResponse;
}

export const ValueColumnComponentContext =
  createContext<ValueColumnComponentContextType>({} as any);
