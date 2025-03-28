import { use } from 'react';
import { WorkspaceContext } from '../context/WorkspaceContext';

export function useWorkspace() {
  const context = use(WorkspaceContext);

  return context.workspace;
}
