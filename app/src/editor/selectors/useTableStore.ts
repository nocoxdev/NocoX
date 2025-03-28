import { useApp } from '@/editor/selectors';

export function useTableStore() {
  const app = useApp();
  return app.tableStore;
}
