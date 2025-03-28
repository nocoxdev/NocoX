import { useStore } from './useStore';

export function useRowKey() {
  const store = useStore();
  return store.rowKeyName;
}
