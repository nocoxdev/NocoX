import { useMemo, useRef, useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { useHover } from 'ahooks';
import { Dropdown, Flex, Modal } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { css, styled, useTheme } from 'styled-components';
import { useCurrentTable, useRowKey } from '@/database/selectors';
import { DataTableRowContext } from '../context/DataTableRowContext';
import { useRowHeightNumber } from '../hooks';
import BodyRowContextMenu from './BodyRowContextMenu';

const StyledBodyRow = styled.tr<{
  $selected?: boolean;
  $height: number;
  $editing: boolean;
}>`
  height: ${({ $height }) => $height}px;
  transition: height 0.2s ease;
  > th {
    background-color: ${({ $selected, theme }) =>
      $selected ? theme.colorPrimaryBg : '#fff'} !important;
  }

  &:hover {
    > th {
      background-color: ${({ $selected, theme }) =>
        $selected ? theme.colorPrimaryBg : '#fafafa'} !important;
    }
  }

  ${({ $editing, theme }) =>
    $editing &&
    css`
      > th {
        background-color: ${theme.colorPrimaryBg} !important;
      }
    `}
`;

const StyledCount = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colorErrorText};
  padding-inline: 4px;
  font-weight: 600;
`;

interface EditableRowProps {
  index: number;
  record: Record<string, any>;
}

const BodyRow = observer((props: EditableRowProps) => {
  const { index, record, ...restProps } = props;
  const [contextMenuOpen, setContextMenuOpen] = useState(false);

  const table = useCurrentTable();
  const { recordStore } = table;
  const rowKey = useRowKey();

  const ref = useRef(null);
  const hovering = useHover(ref);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [waitDeleteKeys, setWaitDeleteKeys] = useState<string[]>([]);
  const theme = useTheme();

  const handleCopy = async () => {
    const resp = await recordStore.insertRecord(record);
    if (resp.success) {
      setContextMenuOpen(false);
    }
  };

  const handleDelete = async () => {
    const resp = await recordStore.deleteRecord(waitDeleteKeys);
    if (resp.success) {
      setDeleteModalOpen(false);
      setWaitDeleteKeys([]);
    }
  };

  const selected = recordStore.selectedRecordKeys.includes(record?.[rowKey]);

  const rowHeight = useRowHeightNumber(table.rowHeight);

  const contextValue = useMemo(
    () => ({
      hovering,
      index,
      selected,
    }),
    [hovering, index, selected],
  );

  return (
    <DataTableRowContext.Provider value={contextValue}>
      <Dropdown
        arrow={false}
        placement="bottomLeft"
        trigger={['contextMenu']}
        open={contextMenuOpen}
        onOpenChange={setContextMenuOpen}
        dropdownRender={() => (
          <BodyRowContextMenu
            record={record}
            onClose={() => setContextMenuOpen(false)}
            onCopy={() => handleCopy()}
            onDelete={(keys) => {
              setWaitDeleteKeys(keys);
              setContextMenuOpen(false);
              setDeleteModalOpen(true);
            }}
          />
        )}
      >
        <StyledBodyRow
          {...restProps}
          ref={ref}
          $height={record ? rowHeight : 0}
          $selected={selected}
          $editing={
            recordStore.currentEditRecord?.[rowKey] === record?.[rowKey]
          }
          onContextMenu={() => {
            if (!recordStore.selectedRecordKeys.includes(record?.[rowKey])) {
              recordStore.setSelectedRowIds([
                ...recordStore.selectedRecordKeys,
                record?.[rowKey],
              ]);
            }
          }}
        />
      </Dropdown>
      <Modal
        title={
          <Flex align="center" gap={4}>
            <IconAlertCircle size={18} color={theme.colorErrorText} />
            {t('Delete records')}
          </Flex>
        }
        open={deleteModalOpen}
        onOk={() => handleDelete()}
        onCancel={() => setDeleteModalOpen(false)}
        okText={t('Delete')}
        cancelText={t('Cancel')}
        okButtonProps={{
          size: 'small',
          danger: true,
          loading: recordStore.requestStates.delete.status === 'pending',
        }}
        cancelButtonProps={{ size: 'small', type: 'text' }}
        width={400}
        style={{ top: 200 }}
      >
        <p>
          {t('Are you sure to delete')}
          <StyledCount>{waitDeleteKeys.length}</StyledCount>
          {t('records')}?
        </p>
      </Modal>
    </DataTableRowContext.Provider>
  );
});

export default BodyRow;
