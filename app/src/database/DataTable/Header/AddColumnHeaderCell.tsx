import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import { useCurrentTable } from '@/database/selectors';
import { useMessage } from '@/selectors';
import type { TableColumnResponse } from '@/services/responses';
import AddColumnPopover from './AddColumnPopover';
import type { ColumnFormValuesType } from './ColumnForm';

const StyledSettingPopoverContainer = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
`;

const StyledContainer = styled.div`
  display: flex;
  transition: all 0.2s;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    svg {
      stroke: ${({ theme }) => theme.colorTextSecondary};
    }
  }
`;

interface AddColumnHeaderCellProps {
  column: TableColumnResponse;
  className?: string;
  style?: React.CSSProperties;
}

const AddColumnHeaderCell = observer((props: AddColumnHeaderCellProps) => {
  const { className, style } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const table = useCurrentTable();
  const { columnStore } = table;
  const message = useMessage();

  const handleColumnAdd = async (values: ColumnFormValuesType) => {
    const data = {
      ...values,
      order: columnStore.columns.length,
      width: 200,
    };

    const resp = await columnStore.addColumn(data);
    if (resp.success) {
      setOpen(false);
    } else {
      message.error(resp.message);
    }
  };

  return (
    <th className={className} style={{ ...style }}>
      <StyledSettingPopoverContainer>
        <AddColumnPopover
          placement="bottomLeft"
          open={open}
          onSubmit={handleColumnAdd}
          onOpenChange={(val) => setOpen(val)}
        />
      </StyledSettingPopoverContainer>
      <StyledContainer onClick={() => setOpen(true)}>
        <IconPlus size={16} color={theme.colorTextTertiary} />
      </StyledContainer>
    </th>
  );
});

export default AddColumnHeaderCell;
