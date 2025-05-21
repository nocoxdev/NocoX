import { useMemo, useState } from 'react';
import { Breadcrumb, Empty, Layout } from 'antd';
import type { SiderTheme } from 'antd/es/layout/Sider';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import { StyledBreadcrumbTitle } from '@/components/common.styled';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useSite } from '@/selectors';
import type { DictionaryGroupResponse } from '@/services/responses';
import GoBack from '../common/GoBack';
import Logo from '../common/Logo';
import { PageHeader } from '../common/PageHeader';
import { DictionaryContext } from './context';
import DataList from './Data';
import GroupList from './GroupList';

const StyledSider = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
`;

const Dictionary = () => {
  const theme = useTheme();
  const site = useSite();

  const [currentGroup, setCurrentGroup] = useState<DictionaryGroupResponse>();

  const contextValue = useMemo(() => {
    return {
      currentGroup,
      setCurrentGroup,
    };
  }, [currentGroup]);

  const breadcrumbItems = [
    {
      title: t('All Groups'),
    },
    {
      title: (
        <StyledBreadcrumbTitle>{currentGroup?.title}</StyledBreadcrumbTitle>
      ),
    },
  ];

  return (
    <ErrorBoundary onReset={() => window.location.reload()}>
      <DictionaryContext.Provider value={contextValue}>
        <Layout style={{ width: '100vw', height: '100vh' }}>
          <Layout.Sider
            theme={site.theme as SiderTheme}
            width={theme.widthMenu}
          >
            <StyledSider>
              <Logo />
              <GoBack title={t('Dictionary')} />
              <GroupList />
            </StyledSider>
          </Layout.Sider>

          <Layout style={{ background: '#fff' }}>
            <Layout.Header style={{ height: 48, lineHeight: 48, padding: 0 }}>
              <PageHeader>
                <Breadcrumb
                  style={{ marginLeft: 24 }}
                  items={breadcrumbItems}
                />
              </PageHeader>
            </Layout.Header>
            <Layout.Content style={{ background: '#f5f7fa', padding: 24 }}>
              {currentGroup ? (
                <DataList key={currentGroup.id} />
              ) : (
                <Empty
                  description={t('Please create or select a dictionary group')}
                  style={{ marginTop: 100 }}
                />
              )}
            </Layout.Content>
          </Layout>
        </Layout>
      </DictionaryContext.Provider>
    </ErrorBoundary>
  );
};

export default Dictionary;
