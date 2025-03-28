import { useRef, useState } from 'react';
import { IconAlertCircle, IconChevronDown } from '@tabler/icons-react';
import { useClickAway } from 'ahooks';
import { Flex, Modal, Skeleton, Tooltip } from 'antd';
import classNames from 'classnames';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import { useCurrentTable } from '@/database/selectors';
import { useMessage } from '@/selectors';
import type { TableColumnResponse } from '@/services/responses';
import { useColumnIcon } from '../hooks';
import ColumnDropdownMenus from './ColumnActionMenus';
import type { ColumnFormValuesType } from './ColumnForm';
import EditColumnPopover from './EditColumnPopover';
import ResizableColumn from './ResizableColumn';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  cursor: pointer;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 16px);
  gap: 8px;
  position: relative;

  &.system {
    > svg {
      path:last-child {
        stroke: ${({ theme }) => theme.colorPrimary};
      }
    }
  }
`;

const StyledSettingPopoverContainer = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
`;

const StyledTitle = styled.div`
  display: block;
  color: ${({ theme }) => theme.colorTextSecondary};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 30px);
`;

const StyledMenuButton = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colorTextSecondary};
  &:hover {
    color: ${({ theme }) => theme.colorTextTertiary};
  }
`;

interface ColumnHeaderCellProps {
  column: TableColumnResponse;
  className?: string;
  style?: React.CSSProperties;
}

const ColumnHeaderCell = observer((props: ColumnHeaderCellProps) => {
  const { column, className, style } = props;
  const [settingOpen, setSettingOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const message = useMessage();

  const ref = useRef<HTMLTableCellElement>(null);
  const table = useCurrentTable();
  const { columnStore } = table;
  const theme = useTheme();
  const [dataCount, setDataCount] = useState(0);

  useClickAway(() => {
    setSettingOpen(false);
  }, ref);

  const Icon = useColumnIcon(column.uiType);

  const handleUpdate = async (value: ColumnFormValuesType) => {
    const resp = await columnStore.updateColumn(column.id, {
      ...column,
      ...value,
    });
    if (resp.success) {
      setEditOpen(false);
    } else {
      message.error(resp.message);
    }
  };

  return (
    <ResizableColumn
      className={className}
      style={style}
      onResize={(width) => columnStore.resizeColumn(column.id, width)}
      onResizeEnd={(width) => columnStore.resizedColumn(column.id, width)}
    >
      <StyledSettingPopoverContainer>
        <ColumnDropdownMenus
          column={column}
          open={settingOpen && !editOpen}
          onEdit={() => setEditOpen(true)}
          onDelete={async () => {
            setDeleteModalOpen(true);
            const resp = await columnStore.getDataCount();
            if (resp.success) {
              setDataCount(resp.data ?? 0);
            }
          }}
        />
        <EditColumnPopover
          initialValues={column}
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSubmit={handleUpdate}
        />
      </StyledSettingPopoverContainer>

      <StyledContainer ref={ref}>
        <StyledTitleContainer className={classNames({ system: column.system })}>
          {Icon && <Icon size={14} color={theme.colorTextSecondary} />}
          {column.title && (
            <StyledTitle>
              <Tooltip title={column.title}>{column.title} </Tooltip>
              {column.primaryKey && (
                <span style={{ color: theme.colorErrorText, marginLeft: 2 }}>
                  *
                </span>
              )}
            </StyledTitle>
          )}
        </StyledTitleContainer>

        <StyledMenuButton>
          <IconChevronDown
            size={12}
            onClick={() => setSettingOpen((pre) => !pre)}
          />
        </StyledMenuButton>
      </StyledContainer>

      <Modal
        title={
          <Flex align="center" gap={4}>
            <IconAlertCircle size={16} color={theme.colorErrorText} />
            Delete field
          </Flex>
        }
        open={deleteModalOpen}
        onOk={async () => {
          const resp = await columnStore.deleteColumn(column.id);
          if (resp.success) {
            setDeleteModalOpen(false);
            message.success(t('Delete success'));
          } else {
            message.error(resp.message);
          }
        }}
        onCancel={() => setDeleteModalOpen(false)}
        okText={t('Delete')}
        cancelText={t('Cancel')}
        okButtonProps={{
          size: 'small',
          danger: true,
          loading: columnStore.requestStates.delete.status === 'pending',
        }}
        cancelButtonProps={{ size: 'small', type: 'text' }}
        width={400}
        style={{ top: 200 }}
      >
        <Skeleton
          loading={columnStore.requestStates.getDataCount.status === 'pending'}
          paragraph={{ rows: 2 }}
        >
          <p>
            {t('This field has {{count}} records, are you sure to delete it?', {
              count: dataCount,
            })}
          </p>
        </Skeleton>
      </Modal>
    </ResizableColumn>
  );
});

export default ColumnHeaderCell;
