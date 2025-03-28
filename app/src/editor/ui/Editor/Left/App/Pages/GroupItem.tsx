import { useMemo, useState } from 'react';
import {
  IconDotsVertical,
  IconEdit,
  IconFile,
  IconTrash,
} from '@tabler/icons-react';
import { Button } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import type { ActionMenusType } from '@/components/ActionMenu';
import ActionMenu from '@/components/ActionMenu';
import { useApp } from '@/editor/selectors';
import type { AppPage } from '@/editor/stores';
import { useMessage } from '@/selectors';
import TemplatesModal from '../TemplateModal';
import GroupFormModal from './GroupFormModal';

const StyledGroupItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${({ theme }) => theme.controlHeightSM}px;
  padding-left: 4px;
`;

const StyledActionWrapper = styled.div`
  visibility: hidden;
  ${StyledGroupItemWrapper}:hover & {
    visibility: visible;
  }

  &:hover {
    svg {
      stroke: ${({ theme }) => theme.colorPrimary} !important;
    }
  }
`;

const StyledTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSize - 1}px;
  color: ${({ theme }) => theme.colorTextSecondary};
`;

interface GroupItemProps {
  group: AppPage;
}

const GroupItem = observer((props: GroupItemProps) => {
  const { group } = props;
  const app = useApp();
  const message = useMessage();
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [updateGroupModalOpen, setUpdateGroupModalOpen] = useState(false);

  const theme = useTheme();

  const items: ActionMenusType = useMemo(
    () => [
      {
        icon: <IconEdit size={12} />,
        title: t('Edit group'),
        onClick: (e: any) => {
          setUpdateGroupModalOpen(true);
          setActionMenuOpen(false);
          e?.stopPropagation();
          e?.preventDefault();
        },
      },
      'divider',
      {
        icon: <IconFile size={12} />,
        title: t('Add page'),
        onClick: (e: any) => {
          setPageModalOpen(true);
          setActionMenuOpen(false);
          e?.stopPropagation();
          e?.preventDefault();
        },
      },
      'divider',
      {
        icon: <IconTrash size={12} />,
        title: t('Delete'),
        className: 'danger',
        loading: app.requestStates.deletePage.status === 'pending',
        confirm: {
          title: t('Are you sure to delete?'),
          okText: t('Ok'),
          cancelText: t('Cancel'),
          okButtonProps: { type: 'primary', danger: true },
        },

        onClick: async () => {
          const resp = await app.deletePage(group.id);
          if (resp.success) {
            message.success(t('Delete success'));
          } else {
            message.error(resp.message);
          }
        },
      },
    ],
    [],
  );

  return (
    <StyledGroupItemWrapper>
      <StyledTitle>
        {/* <IconBoxMultiple color={theme.colorTextQuaternary} size={12} /> */}
        {group.title}
      </StyledTitle>

      <ActionMenu
        items={items}
        open={actionMenuOpen}
        onOpenChange={(val) => setActionMenuOpen(val)}
      >
        <StyledActionWrapper>
          <Button
            type="link"
            size="small"
            onClick={() => setActionMenuOpen(!actionMenuOpen)}
          >
            <IconDotsVertical size={12} color={theme.colorTextTertiary} />
          </Button>
        </StyledActionWrapper>
      </ActionMenu>

      <TemplatesModal
        parentId={group.id}
        open={pageModalOpen}
        afterOpenChange={setPageModalOpen}
        onClose={() => setPageModalOpen(false)}
        onOk={() => setPageModalOpen(false)}
      />
      <GroupFormModal
        title={t('Edit group')}
        initialValues={group.info}
        open={updateGroupModalOpen}
        onClose={() => setUpdateGroupModalOpen(false)}
        onOk={() => setUpdateGroupModalOpen(false)}
        submiting={app.requestStates.updatePage.status === 'pending'}
        onSubmit={async (values) => {
          const resp = await app.updatePage(
            group.id,
            values.title,
            values.description,
          );
          if (resp.success) {
            message.success(t('Update success'));
            setUpdateGroupModalOpen(false);
          } else {
            message.error(resp.message);
          }
        }}
      />
    </StyledGroupItemWrapper>
  );
});

export default GroupItem;
