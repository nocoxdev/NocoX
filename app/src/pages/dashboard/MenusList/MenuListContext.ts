import { createContext } from 'react';
import type { WorkspaceStore } from '../workspace/stores/WorkspaceStore';

export interface MenuListContextValueType {
  workspaceStore: WorkspaceStore;
}

export const MenuListContext = createContext<MenuListContextValueType>(
  null as any,
);
