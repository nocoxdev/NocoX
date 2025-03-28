import { createContext } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { TableStore } from './stores';

export interface DatabaseContextType {
  store: TableStore;
  size?: SizeType;
}

export const DatabaseContext = createContext<DatabaseContextType>({} as any);
