import { createContext } from 'react';
import type { Workspace } from '../stores/Workspace';

export interface WorkspaceContextValueType {
  workspace: Workspace;
}

export const WorkspaceContext = createContext<WorkspaceContextValueType>(
  null as any,
);
