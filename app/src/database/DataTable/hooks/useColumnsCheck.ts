import { useCallback, useEffect, useState } from 'react';
import { useCurrentTable } from '@/database/selectors';

export function useColumnsCheck() {
  const table = useCurrentTable();
  const { columnStore } = table;
  const [indeterminate, setIndeterminate] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const checkedCount = columnStore.columns.filter(
      (item) => !item.hidden,
    ).length;
    setIndeterminate(
      checkedCount > 0 && checkedCount < columnStore.columns.length,
    );
    setAllChecked(checkedCount === columnStore.columns.length);
  }, [columnStore.columns.map((item) => item.hidden)]);

  const showAll = useCallback(() => {
    columnStore.showColumns(
      columnStore.columns
        .filter((item) => item.hidden === true)
        .map((item) => item.id),
    );
  }, [columnStore.columns]);

  const hideAll = useCallback(() => {
    columnStore.hideColumns(
      columnStore.columns
        .filter((item) => item.hidden !== true)
        .map((item) => item.id),
    );
  }, [columnStore.columns]);

  return { indeterminate, allChecked, showAll, hideAll };
}
