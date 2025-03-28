import { useDebounceEffect } from 'ahooks';
import { useApp, useCurPage } from '../selectors';

export function useAutoSavePage() {
  const currentPage = useCurPage();
  const app = useApp();

  useDebounceEffect(
    () => {
      app.saveData('AutoSave', currentPage?.jsonString || '');
    },
    [currentPage?.jsonString],
    {
      wait: 10 * 1000,
    },
  );
}
