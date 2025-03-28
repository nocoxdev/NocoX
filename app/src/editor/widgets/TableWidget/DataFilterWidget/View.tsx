import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { use } from 'react';
import type { DataFilterProps } from '@/components/DataFilter';
import DataFilter from '@/components/DataFilter';
import { ProTableWidgetContext } from '../context/ProTableWidgetContext';

const DataFilterWidget = (props: Omit<DataFilterProps, 'onFilter'>) => {
  const { size, columns, secondaryFilter, setSecondaryFilter } = use(
    ProTableWidgetContext,
  );

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
    <DataFilter
      size={size}
      {...props}
      fields={fields}
      value={secondaryFilter}
      onChange={setSecondaryFilter}
    />
  );
};

export default DataFilterWidget;
