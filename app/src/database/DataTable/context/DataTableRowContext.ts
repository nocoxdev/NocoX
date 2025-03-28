import { createContext } from 'react';

export interface DataTableRowContextType {
  hovering?: boolean;
  index: number;
  selected: boolean;
}

export const DataTableRowContext = createContext<DataTableRowContextType>(
  {} as any,
);
