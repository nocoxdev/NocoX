import { createContext } from 'react';
import type { App } from '../stores';

interface AppContextValueType {
  app: App;
}

export const AppContext = createContext<AppContextValueType>(null as any);
