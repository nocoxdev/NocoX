import type { TableColumnType } from 'antd';

export const CheckHeaderCellWidth = 80;

export const DefaultAddColumn: TableColumnType & { id: string } = {
  id: 'add',
  dataIndex: 'add',
  width: 60,
};
