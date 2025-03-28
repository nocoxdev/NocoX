import { useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { IconApps, IconChevronDown, IconTemplate } from '@tabler/icons-react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex, Input, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import AppTemplatesModal from '@/pages/dashboard/workspace/Apps/AppTemplatesModal';
import { useAppStore, useWorkspace } from '../selectors';
import CreateAppModal from './CreateAppModal';
import WorkspaceSetting from './WorkspaceSetting';

const StyledToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colorText};
`;

const StyledItem = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5.5px 12px;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colorErrorText : theme.colorTextSecondary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  &:hover {
    background-color: ${({ theme, $danger }) =>
      $danger ? theme.colorErrorBgHover : theme.controlItemBgHover};
  }
`;

const Toolbar = observer(() => {
  const workspace = useWorkspace();
  const store = useAppStore();

  const theme = useTheme();
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [createAppModalOpen, setCreateAppModalOpen] = useState(false);

  const handleSearch = async () => {
    store.loadList();
  };

  const createButtonMenus: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <StyledItem>
          <IconApps size={14} stroke={2} />
          {t('New app')}
        </StyledItem>
      ),
      style: { padding: 0 },
      onClick: () => setCreateAppModalOpen(true),
    },
    {
      key: 2,
      type: 'divider',
    },
    {
      key: 3,
      label: (
        <StyledItem>
          <IconTemplate size={14} stroke={2} />
          {t('Use template')}
        </StyledItem>
      ),
      style: { padding: 0 },
      onClick: () => setTemplateModalOpen(true),
    },
  ];

  return (
    <StyledToolbarContainer>
      <StyledTitle>{workspace?.title}</StyledTitle>
      <Flex gap={4}>
        <Input.Search
          placeholder={t('Please input app name')}
          size="small"
          style={{ width: 300 }}
          onSearch={handleSearch}
        />
        <Dropdown
          menu={{ items: createButtonMenus }}
          overlayStyle={{ width: 150 }}
          trigger={['click']}
        >
          <Button type="primary" style={{ width: 100 }} size="small">
            <Flex gap={8} align="center" justify="center">
              {t('Create app')}
              <IconChevronDown size={theme.fontSize} />
            </Flex>
          </Button>
        </Dropdown>
        <WorkspaceSetting workspace={workspace} />
        <Tooltip title={t('Reload')} placement="top">
          <Button
            type="text"
            size="small"
            onClick={() => store.loadList()}
            icon={<ReloadOutlined />}
            style={{ color: theme.colorTextSecondary }}
          />
        </Tooltip>
      </Flex>
      <CreateAppModal
        open={createAppModalOpen}
        onClose={() => setCreateAppModalOpen(false)}
      />
      <AppTemplatesModal
        open={templateModalOpen}
        onCancel={() => setTemplateModalOpen(false)}
      />
    </StyledToolbarContainer>
  );
});

export default Toolbar;
