import { use } from 'react';
import { useControllableValue } from 'ahooks';
import { Select } from 'antd';
import { t } from 'i18next';
import { useOptions } from '@/editor/hooks';
import type { ValueComponentProps } from '@/types';
import { ValueColumnComponentContext } from '../../context';

export const RelationColumn = (props: ValueComponentProps) => {
  const [value, setValue] = useControllableValue(props);
  const { column } = use(ValueColumnComponentContext);

  const { options, loading, error } = useOptions(
    {
      type: 'dataTable',
      dataTable: {
        tableId: column.relation?.tableId || '',
        columnName: column.relation?.displayColumnName || '',
      },
    },
    [value],
  );

  return (
    <Select
      value={value}
      onChange={(id) => setValue(id)}
      options={options}
      loading={loading}
      notFoundContent={error || t('No data')}
      showSearch
    />
  );
};
