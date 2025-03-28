import { useState } from 'react';
import {
  IconPencilMinus,
  IconSettings,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import { Button, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import type { ActionMenusType } from '@/components/ActionMenu';
import ActionMenu from '@/components/ActionMenu';
import { useMessage } from '@/selectors';
import type { WorkspaceResponse } from '@/services/responses';
import RenameWorkspaceModal from '../RenameWorkspaceModal';
import { useWorkspaceStore } from '../selectors';
import WorkspaceMemberListModal from '../WorkspaceMemberListModal';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface WorkspaceSettingActionsProps {
  workspace: WorkspaceResponse;
}

const WorkspaceSettingActions = observer(
  ({ workspace }: WorkspaceSettingActionsProps) => {
    const store = useWorkspaceStore();
    const [moreActionOpen, setMoreActionOpen] = useState(false);
    const [renameWorkspaceOpen, setRenameWorkspaceOpen] = useState(false);
    const [workspaceMemberOpen, setWorkspaceMemberOpen] = useState(false);
    const theme = useTheme();
    const message = useMessage();

    const handleDeleteWorkspace = async (id: string) => {
      const resp = await store.deleteWorkspace(id);
      if (resp.success) {
        setMoreActionOpen(false);
      } else {
        message.error(resp.message);
      }
    };
    const actionMenus: ActionMenusType = [
      {
        icon: <IconUsers size={13} stroke={2} />,
        title: t('Members'),
        onClick: () => {
          setWorkspaceMemberOpen(true);
          setMoreActionOpen(false);
        },
      },
      {
        icon: <IconPencilMinus size={13} stroke={2} />,
        title: t('Rename'),
        onClick: () => {
          setRenameWorkspaceOpen(true);
          setMoreActionOpen(false);
        },
      },
      'divider',
      {
        icon: <IconTrash size={13} stroke={2} />,
        title: t('Delete'),
        className: 'danger',
        onClick: () => handleDeleteWorkspace(workspace.id),
        loading: store.requestStates.delete.status === 'pending',
        confirm: {
          title: t('Delete workspace'),
          description: t('Are you sure you want to delete this workspace?'),
          okText: t('Confirm'),
          okButtonProps: { danger: true, size: 'small' },
          cancelButtonProps: { type: 'text', size: 'small' },
          cancelText: t('Cancel'),
          placement: 'bottomLeft',
          styles: {
            body: {
              width: 228,
            },
          },
        },
      },
    ];

    return (
      <StyledContainer>
        <ActionMenu
          items={actionMenus}
          open={moreActionOpen}
          onOpenChange={(val) => setMoreActionOpen(val)}
          placement="bottomRight"
        >
          <Tooltip title={t('Setting')} placement="top">
            <Button type="text" size="small">
              <IconSettings
                size={16}
                stroke={1.5}
                color={theme.colorTextSecondary}
              />
            </Button>
          </Tooltip>
        </ActionMenu>
        <RenameWorkspaceModal
          destroyOnClose
          workspace={workspace}
          open={renameWorkspaceOpen}
          onClose={() => setRenameWorkspaceOpen(false)}
        />
        <WorkspaceMemberListModal
          workspace={workspace}
          destroyOnClose
          open={workspaceMemberOpen}
          onClose={() => setWorkspaceMemberOpen(false)}
        />
      </StyledContainer>
    );
  },
);

export default WorkspaceSettingActions;
