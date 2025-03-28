import { useApp } from './useApp';

export function useCurPage() {
  const { curPage } = useApp();
  return curPage;
}
