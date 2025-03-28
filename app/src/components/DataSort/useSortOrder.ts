import { use, useMemo } from 'react';
import { DataSortContext } from './DataSortContext';
import type { ISortItem } from './type';

export function useSortOrder(sort: ISortItem) {
  const { fields, configs } = use(DataSortContext);

  const options = useMemo(() => {
    const field = fields.find((item) => item.name === sort.name);

    const newOptions = configs.find((item) => {
      return field && item.types.includes(field.valueType);
    })?.options;

    return newOptions || [];
  }, [sort.name]);

  return { options };
}
