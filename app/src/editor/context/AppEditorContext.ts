import { createContext } from 'react';
import type { App, Canvas } from '../stores';

export interface AppEditorContextType {
  app: App;
  canvas: Canvas;
  size?: 'large' | 'middle' | 'small';
}

export const AppEditorContext = createContext<AppEditorContextType>({} as any);
