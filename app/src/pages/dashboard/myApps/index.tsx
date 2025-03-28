import { useRequest } from 'ahooks';
import { Empty, Flex } from 'antd';
import { Skeleton } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import { StyleEmptyContainer } from '@/components/common.styled';
import { StyledContentContainer } from '@/pages/common/styled';
import { AppReleaseApi } from '@/services/api';
import AppCard from './Card';
import Toolbar from './Toolbar';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MyApps = () => {
  const { data: resp, loading, runAsync } = useRequest(AppReleaseApi.getMyApps);

  return (
    <StyledContentContainer>
      <StyledContainer>
        <Toolbar onReload={async () => runAsync()} />
        <Skeleton active loading={loading}>
          {resp?.data && resp.data.length > 0 ? (
            <Flex gap={16} wrap>
              {resp.data.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </Flex>
          ) : (
            <StyleEmptyContainer>
              <Empty description={t('No apps')} />
            </StyleEmptyContainer>
          )}
        </Skeleton>
      </StyledContainer>
    </StyledContentContainer>
  );
};

export default MyApps;
