import { createContext } from 'react';

export interface ParamsContextType {
  params: Record<string, any>;
}

export const ParamsContext = createContext<ParamsContextType>({} as any);
