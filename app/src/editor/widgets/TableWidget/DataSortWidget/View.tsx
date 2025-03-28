import type { ReactNode } from 'react';
import { use, useMemo } from 'react';
import type { DataSortProps } from '@/components/DataSort';
import DataSort from '@/components/DataSort';
import { ProTableWidgetContext } from '../context/ProTableWidgetContext';

const DataSortWidget = (props: DataSortProps) => {
  const { size, columns, sorts, setSorts } = use(ProTableWidgetContext);

  const fields = useMemo(
    () =>
      columns
        ?.filter(
          (column) =>
            column.dataIndex &&
            column.dataIndex !== 'index' &&
            column.dataIndex !== 'actions',
        )
        .map((column) => ({
          name: column.dataIndex,
          title: column.title as ReactNode,
          valueType: column.dataValueType,
        })) || [],
    [columns],
  );

  return (
    <DataSort
      size={size}
      {...props}
      fields={fields}
      value={sorts}
      onChange={setSorts}
    />
  );
};

export default DataSortWidget;
