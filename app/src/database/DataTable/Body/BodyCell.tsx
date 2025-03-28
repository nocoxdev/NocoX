import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { type TableColumnInfo } from '@/types';
import { useBodyCellRender } from '../hooks';
import IndexCell from './IndexCell';

const StyledTh = styled.th`
  vertical-align: top;
  border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
`;

const StyledContent = styled.div`
  display: block;
  width: 100%;
  padding-inline: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface BodyCellProps {
  record: Record<string, any>;
  selection?: boolean;
  column?: TableColumnInfo;
  index?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const BodyCell = observer((props: BodyCellProps) => {
  const { selection, record, column, children, index, ...restProps } = props;
  const renderCell = useBodyCellRender(column?.uiType);
  if (!selection) {
    if (!column || !renderCell) {
      if (children) {
        if (Array.isArray(children) && children.every((item) => !item)) {
          return null;
        }
        return <th {...restProps}>{children}</th>;
      }

      return null;
    }

    const value = record[column.columnName];

    return (
      <StyledTh {...restProps}>
        <StyledContent>
          {renderCell(value, record, column, index)}
        </StyledContent>
      </StyledTh>
    );
  } else {
    return (
      <IndexCell {...restProps} record={record}>
        {children}
      </IndexCell>
    );
  }
});

export default BodyCell;
