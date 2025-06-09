import { useState } from 'react';
import { FilterConjunction } from '@/components/DataFilter/type';
import type { QueryListParamsType, QueryPageListParamsType } from '@/types';

const defaultQueryListParams: QueryListParamsType = {
  keywords: '',
  filter: {
    conditions: [],
    conjunction: FilterConjunction.And,
  },
  sorts: [],
};

export function useQueryListParams() {
  const [queries, setInnerQueries] = useState<QueryListParamsType>(
    defaultQueryListParams,
  );

  const setQueries = (queries: Partial<QueryListParamsType>) => {
    setInnerQueries((prev) => ({ ...prev, ...queries }));
  };

  return [queries, setQueries] as const;
}

export function useQueryPageListParams(pageSize?: number) {
  const [queries, setInnerQueries] = useState<QueryPageListParamsType>({
    ...defaultQueryListParams,
    pageIndex: 1,
    pageSize: pageSize || 6,
  });

  const setQueries = (queries: Partial<QueryPageListParamsType>) => {
    setInnerQueries((prev) => ({ ...prev, ...queries }));
  };

  return [queries, setQueries] as const;
}
