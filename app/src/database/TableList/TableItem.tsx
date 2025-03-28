import type { CSSProperties } from 'react';
import { useState } from 'react';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { Popconfirm } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { useStore } from '@/database/selectors';
import type { TableResponse } from '@/services/responses';
import EditTableModal from './EditTableModal';

const StyledContainer = styled.div<{ $selected: boolean }>`
  display: flex;
  height: ${({ theme }) => theme.controlHeightSM}px;
  align-items: center;
  justify-content: space-between;
  padding-inline: 6px;
  color: ${({ theme }) => theme.colorTextSecondary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: 100%;
  cursor: pointer;

  > .title {
    display: block;
    height: ${({ theme }) => theme.controlHeightSM}px;
    line-height: ${({ theme }) => theme.controlHeightSM}px;
    flex-grow: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: ${({ theme }) => theme.fontSize}px;
    color: ${({ theme, $selected }) =>
      $selected ? theme.colorPrimaryText : theme.colorText};
  }
`;

const StyledActions = styled.div`
  display: flex;
  visibility: hidden;
  height: 100%;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;

  ${StyledContainer}:hover & {
    visibility: visible;
  }
`;

const StyledActionItem = styled.div`
  display: flex;
  height: 100%;
  width: 20px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colorTextTertiary};
  transition: all 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colorText};
  }

  &.danger {
    color: ${({ theme }) => theme.colorErrorText};
    &:hover {
      color: ${({ theme }) => theme.colorErrorTextActive};
    }
  }
`;

interface TableItemProps {
  data: TableResponse;
  style?: CSSProperties;
  onDelete: () => void;
}

const TableItem = observer((props: TableItemProps) => {
  const { data, style, onDelete } = props;
  const [editModalOpen, setEditModalOpen] = useState(false);

  const store = useStore();

  return (
    <>
      <StyledContainer
        $selected={data.id === store.current?.id}
        onClick={() => store.setCurrent(data.id)}
      >
        <div className="title" style={style}>
          {data.title}
        </div>
        <StyledActions>
          <StyledActionItem onClick={() => setEditModalOpen(true)}>
            <IconPencil size={13} />
          </StyledActionItem>
          <Popconfirm
            onConfirm={onDelete}
            title={t('Drop table')}
            description={t('Are you sure to drop this table?')}
            okButtonProps={{ size: 'small', danger: true }}
            cancelButtonProps={{ size: 'small', type: 'text' }}
            placement="bottom"
          >
            <StyledActionItem className="danger">
              <IconTrash size={13} />
            </StyledActionItem>
          </Popconfirm>
        </StyledActions>
      </StyledContainer>
      <EditTableModal
        destroyOnClose
        open={editModalOpen}
        initialValues={data}
        onOk={() => setEditModalOpen(false)}
        onClose={() => setEditModalOpen(false)}
      />
    </>
  );
});

export default TableItem;
