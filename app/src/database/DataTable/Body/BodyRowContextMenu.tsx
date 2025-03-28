import { IconCopy, IconTrash } from '@tabler/icons-react';
import { Divider } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import { useCurrentTable, useRowKey } from '@/database/selectors';

const StyledContainer = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colorBgElevated};
  border-radius: ${({ theme }) => theme.borderRadiusLG}px;
  box-shadow: ${({ theme }) => theme.boxShadowSecondary};
  padding: 6px 4px;
`;

const StyledActionItem = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  transition: background-color 0.2s;
  cursor: pointer;
  padding-inline: 6px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colorText};
  gap: 8px;
  margin-block: 2px;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.colorFillTertiary};
  }

  &.danger {
    color: ${({ theme }) => theme.colorErrorText};

    &:hover {
      background-color: ${({ theme }) => theme.colorErrorBgActive};
    }
  }
`;

interface BodyRowContextMenuProps {
  record: any;
  onClose: () => void;
  onDelete: (keys: string[]) => void;
  onCopy: () => void;
}

const BodyRowContextMenu = observer((props: BodyRowContextMenuProps) => {
  const { record, onCopy, onDelete } = props;
  const table = useCurrentTable();
  const { recordStore } = table;
  const rowKey = useRowKey();
  const theme = useTheme();

  const selected = recordStore.selectedRecordKeys.includes(record[rowKey]);

  return selected && recordStore.selectedRecordKeys.length > 1 ? (
    <StyledContainer>
      <StyledActionItem
        className="danger"
        onClick={() => onDelete(recordStore.selectedRecordKeys)}
      >
        <IconTrash size={14} color={theme.colorError} />
        <span>
          {t('Delete {{count}} records', {
            count: recordStore.selectedRecordKeys.length,
          })}
        </span>
      </StyledActionItem>
    </StyledContainer>
  ) : (
    <StyledContainer>
      <StyledActionItem onClick={() => onCopy()}>
        <IconCopy size={14} color={theme.colorTextTertiary} />
        <span>{t('Copy')}</span>
      </StyledActionItem>
      <Divider style={{ marginBlock: 4 }} />
      <StyledActionItem
        className="danger"
        onClick={() => {
          recordStore.setSelectedRowIds([record[rowKey]]);
          onDelete([record[rowKey]]);
        }}
      >
        <IconTrash size={14} color={theme.colorError} />
        <span>{t('Delete')}</span>
      </StyledActionItem>
    </StyledContainer>
  );
});

export default BodyRowContextMenu;
