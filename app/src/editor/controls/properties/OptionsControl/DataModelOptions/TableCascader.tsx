import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import { observer } from 'mobx-react-lite';
import { useTableStore } from '@/editor/selectors';

const TableCascader = observer((props: CascaderProps) => {
  const tableStore = useTableStore();
  const options = tableStore.tables.map((table) => ({
    value: table.id,
    label: table.title,
    children: table.columnStore.columns.map((column) => ({
      value: column.columnName,
      label: column.title,
    })),
  }));

  return <Cascader {...props} options={options} multiple={false} />;
});

export default TableCascader;
