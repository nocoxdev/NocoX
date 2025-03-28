import { useState } from 'react';
import { IconPlayerPlay, IconSend } from '@tabler/icons-react';
import { Button, Flex, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import { useApp } from '@/editor/selectors';
import AppReleaseModal from '@/editor/ui/Editor/Header/AppReleaseModal';
import { LangSetting, UserAvatar } from '@/pages/common/PageHeader';
import SavingStatus from '../../components/SavingStatus';
import Actions from './Actions';
import HistoryActions from './Histories';
import LatestReleaseVersion from './LatestReleaseVersion';

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

export const StyledHeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: calc(
    100% - ${({ theme }) => (theme.widthDesignerLeftSidebar || 200) + 1}px
  );
  padding-inline: 12px;
`;

const Right = observer(() => {
  const [releaseModalOpen, setReleaseModalOpen] = useState(false);

  const app = useApp();
  const theme = useTheme();

  return (
    <StyledHeaderRightContainer>
      <Actions />
      <SavingStatus
        status={app.requestStates.saveData.status}
        error={app.requestStates.saveData.message}
      />
      <StyledContainer>
        <Flex gap={12} align="center">
          <LatestReleaseVersion />
          <HistoryActions />
          <Tooltip title={t('Preview')}>
            <Button
              size="small"
              color="green"
              variant="solid"
              icon={<AntdIcon content={IconPlayerPlay} />}
              onClick={() => window.open(`/preview/${app.id}`, '_blank')}
            />
          </Tooltip>
          <Button
            type="primary"
            size="small"
            style={{ width: 80, fontSize: 13 }}
            onClick={() => setReleaseModalOpen(true)}
          >
            <Flex align="center" gap={4}>
              <IconSend size={13} />
              <span style={{ fontSize: theme.fontSize }}>{t('Release')}</span>
            </Flex>
          </Button>
          <LangSetting />

          <UserAvatar />
        </Flex>
        <AppReleaseModal
          open={releaseModalOpen}
          destroyOnClose
          onClose={() => setReleaseModalOpen(false)}
          onOk={() => setReleaseModalOpen(false)}
        />
      </StyledContainer>
    </StyledHeaderRightContainer>
  );
});

export default Right;
