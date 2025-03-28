import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Button, ConfigProvider, theme, Tooltip } from 'antd';
import { t } from 'i18next';
import styled from 'styled-components';
import { useSite } from '@/selectors';
import CreateWorkspaceModal from './CreateWorkspaceModal';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 12px;
  width: 100%;
  height: 24px;
  > :first-child {
    color: ${({ theme }) => theme.colorText};
    font-weight: 600;
  }

  &.dark {
    > :first-child {
      color: rgba(255, 255, 255, 0.65);
    }
  }
`;

interface WorkspaceMenuHeaderProps {
  count: number;
}

const WorkspaceMenuHeader = ({ count }: WorkspaceMenuHeaderProps) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const site = useSite();

  return (
    <StyledContainer className={site.theme}>
      <ConfigProvider
        theme={{
          algorithm:
            site.theme === 'dark'
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
      >
        <span>
          {t('Workspaces')}({count})
        </span>
        <Tooltip title={t('Create workspace')} placement="top">
          <Button
            type="text"
            size="small"
            icon={<IconPlus size={14} stroke={1} />}
            onClick={() => setCreateModalOpen(true)}
          />
        </Tooltip>
      </ConfigProvider>
      <CreateWorkspaceModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </StyledContainer>
  );
};

export default WorkspaceMenuHeader;
