import { useWorkspace } from './useWorkspace';

export function useAppStore() {
  const workspace = useWorkspace();
  return workspace.appStore;
}
