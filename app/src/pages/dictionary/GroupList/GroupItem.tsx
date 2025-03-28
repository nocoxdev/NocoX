import type { CSSProperties } from 'react';
import { use, useState } from 'react';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { Popconfirm } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import { useMessage } from '@/selectors';
import { DictionaryGroupApi } from '@/services/api';
import type { DictionaryGroupResponse } from '@/services/responses';
import { DictionaryContext } from '../context';
import EditGroupModal from './EditGroupModal';

const StyledContainer = styled.div<{ $selected: boolean }>`
  display: flex;
  height: ${({ theme }) => theme.controlHeightSM}px;
  align-items: center;
  justify-content: space-between;
  padding-inline: 6px;
  color: ${({ theme }) => theme.colorTextSecondary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: 100%;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colorPrimaryBg : 'transparent'};
  transition: background-color 0.2s;
  padding-inline: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $selected }) =>
      $selected ? theme.colorPrimaryBg : theme.colorFillSecondary};
  }

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

interface GroupItemProps {
  data: DictionaryGroupResponse;
  style?: CSSProperties;
}

const GroupItem = (props: GroupItemProps) => {
  const { data, style } = props;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { currentGroup, setCurrentGroup } = use(DictionaryContext);
  const message = useMessage();

  const handleDelete = async () => {
    const resp = await DictionaryGroupApi.delete(data.id);
    if (resp.success) {
      message.success(t('Delete success'));
    } else {
      message.error(resp.message);
    }
  };

  return (
    <>
      <StyledContainer
        $selected={data.id === currentGroup?.id}
        onClick={() => setCurrentGroup(data)}
      >
        <div className="title" style={style}>
          {data.title}
        </div>
        <StyledActions>
          <StyledActionItem onClick={() => setEditModalOpen(true)}>
            <IconPencil size={13} />
          </StyledActionItem>
          <Popconfirm
            onConfirm={handleDelete}
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
      <EditGroupModal
        destroyOnClose
        open={editModalOpen}
        initialValues={data}
        onOk={() => setEditModalOpen(false)}
        onClose={() => setEditModalOpen(false)}
      />
    </>
  );
};

export default GroupItem;
