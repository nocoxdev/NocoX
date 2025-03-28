import { use } from 'react';
import { IconArrowsDiagonal } from '@tabler/icons-react';
import { Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import { useCurrentTable, useRowKey } from '@/database/selectors';
import { DataTableRowContext } from '../context';

const StyledCellWrapper = styled.th`
  position: relative;
  padding: 0px;
  transition: all 0.2s;
`;

const StyledShowDetailButtonWrapper = styled.div<{ $visible: boolean }>`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 100%;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  right: 4px;
  top: 0px;
`;

const StyledShowDetailButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s;
  &:hover:not(.dragging) {
    background-color: ${({ theme }) => theme.colorPrimaryBgHover};
    border-radius: 50%;
  }
`;

interface SelectionCellProps {
  record: Record<string, any>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const IndexCell = observer((props: SelectionCellProps) => {
  const { record, className, style, children } = props;
  const { hovering, index, selected } = use(DataTableRowContext);
  const table = useCurrentTable();
  const { recordStore } = table;
  const theme = useTheme();
  const rowKey = useRowKey();

  return (
    <StyledCellWrapper className={className} style={style}>
      {selected || hovering ? children : index + 1}

      {hovering && (
        <Tooltip title="Expand" placement="bottom">
          <StyledShowDetailButtonWrapper $visible={hovering}>
            <StyledShowDetailButton
              onClick={() => recordStore.setCurrentEditRecordId(record[rowKey])}
            >
              <IconArrowsDiagonal color={theme.colorPrimary} size={14} />
            </StyledShowDetailButton>
          </StyledShowDetailButtonWrapper>
        </Tooltip>
      )}
    </StyledCellWrapper>
  );
});

export default IndexCell;
