import { useStore } from './useStore';

export function useCurrentTable() {
  const store = useStore();
  return store.current!;
}
