import type { CSSProperties } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import type { UiType } from '@/types';

export type TableColumnProps<T> = {
  style: CSSProperties;
  className: string;
  valueType: ProColumns['valueType'] | 'custom';
  dataValueType: UiType;
  cell: React.ReactNode;
} & Omit<ProColumns<T>, 'valueType'>;

const TableColumnView = (_: TableColumnProps<unknown>) => {
  return null;
};

export default TableColumnView;
