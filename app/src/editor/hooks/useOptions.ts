import type { DependencyList } from 'react';
import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { t } from 'i18next';
import { AppDataApi, dictionaryApi } from '@/services/api';
import type { EnhancedOptions, MergedEnhancedOptions } from '@/types';

interface UseOptionsReturn {
  options: EnhancedOptions['options'];
  loading: boolean;
  error: string;
}

export function useOptions(
  enhancedOptions?: MergedEnhancedOptions,
  deps?: DependencyList,
): UseOptionsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [options, setOptions] = useState<EnhancedOptions['options']>([]);

  const fetchDataModelOptions = async (
    tableId: string | undefined,
    columnName: string | undefined,
  ) => {
    if (!tableId || !columnName) {
      setError(t('TableId and ColumnName are required'));
      setOptions([]);
      return;
    }

    setLoading(true);

    const resp = await AppDataApi.getList({ tableId });
    if (resp.success && resp.data) {
      const data = resp.data.map((item) => ({
        value: item.id,
        label: item[columnName],
      }));
      setOptions(data);
    } else {
      setOptions([]);
      setError(resp.message || t('Failed to fetch data'));
    }
    setLoading(false);
  };

  const fetchDictionaryOptions = async (
    groupId?: string,
    includeChildren: boolean = false,
  ) => {
    if (!groupId) {
      setError(t('GroupId is required'));
      setOptions([]);
      return;
    }

    setLoading(true);

    const resp = await dictionaryApi.getList({
      groupId,
      includeChildren,
    });
    if (resp.success && resp.data) {
      const data = resp.data.map((item) => ({
        value: item.id,
        label: item.title,
      }));
      setOptions(data);
    } else {
      setOptions([]);
      setError(resp.message || t('Failed to fetch data'));
    }
    setLoading(false);
  };

  useAsyncEffect(async () => {
    if (Array.isArray(enhancedOptions)) {
      setOptions(enhancedOptions);
      return;
    }

    const { type, dataTable, options: defaultOptions } = enhancedOptions || {};
    switch (type) {
      case 'dataTable':
        await fetchDataModelOptions(dataTable?.tableId, dataTable?.columnName);
        break;
      case 'dictionary':
        await fetchDictionaryOptions(enhancedOptions?.dictionary?.groupId);
        break;
      default:
        setOptions(defaultOptions || []);
    }
  }, deps);

  return { options, loading, error };
}
