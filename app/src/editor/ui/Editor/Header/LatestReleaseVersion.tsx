import { IconVersionsFilled } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Flex, Skeleton } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import { useApp } from '@/editor/selectors';
import { AppApi } from '@/services/api';

const StyledContainer = styled.div`
  width: auto;
  color: ${({ theme }) => theme.colorPrimaryText};
  font-size: 12px;
  margin-right: 12px;
`;

const LatestReleaseVersion = observer(() => {
  const app = useApp();
  const theme = useTheme();

  const { data: resp, loading } = useRequest(() =>
    AppApi.getLatestVersion(app.id),
  );

  return (
    <StyledContainer>
      <Flex align="center" justify="space-between">
        <Skeleton
          loading={loading}
          paragraph={false}
          active={true}
          style={{ width: 120 }}
        >
          {resp?.success && resp?.data ? (
            <Flex align="center" gap={8}>
              <Flex align="center" gap={4}>
                <IconVersionsFilled color={theme.colorPrimary} size={16} />
                {t('Latest release version')}
              </Flex>
              <span style={{ fontWeight: 600 }}>{resp?.data?.version}</span>
            </Flex>
          ) : (
            <Flex gap={16} align="center">
              <span>{t('No release version')}</span>
            </Flex>
          )}
        </Skeleton>
      </Flex>
    </StyledContainer>
  );
});

export default LatestReleaseVersion;
