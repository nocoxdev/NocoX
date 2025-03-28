import { observer } from 'mobx-react-lite';
import type { TableColumnResponse } from '@/services/responses';
import AddColumnHeaderCell from './AddColumnHeaderCell';
import ColumnHeaderCell from './ColumnHeaderCell';

interface HeaderCellProps {
  column?: TableColumnResponse;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const HeaderCell = observer((props: HeaderCellProps) => {
  const { className, style, column, children } = props;

  if (!column) {
    return <th {...props}>{children}</th>;
  }

  if (column.id === 'add') {
    return (
      <AddColumnHeaderCell
        column={column}
        style={style}
        className={className}
      />
    );
  }

  return (
    <ColumnHeaderCell column={column} style={style} className={className} />
  );
});

export default HeaderCell;
