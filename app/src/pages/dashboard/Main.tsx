import { useMemo } from 'react';
import { Outlet, useNavigation } from 'react-router';
import { Layout, Skeleton } from 'antd';
import type { SiderTheme } from 'antd/es/layout/Sider';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useSite, useUser } from '@/selectors';
import Logo from '../common/Logo';
import { PageHeader } from '../common/PageHeader';
import MenuList from './MenusList';
import { MenuListContext } from './MenusList/MenuListContext';
import { WorkspaceStore } from './workspace/stores/WorkspaceStore';

const StyledSider = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};

  .ant-menu-item {
    font-weight: 500;
  }
`;
const Main = observer(() => {
  const theme = useTheme();
  const site = useSite();
  const navigation = useNavigation();
  const user = useUser();

  const workspaceStore = useMemo(() => new WorkspaceStore(), []);

  return (
    user.profile && (
      <ErrorBoundary onReset={() => window.location.reload()}>
        <MenuListContext.Provider value={{ workspaceStore }}>
          <Layout
            style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
          >
            <Layout.Sider
              width={theme.widthMenu}
              theme={site.theme as SiderTheme}
            >
              <StyledSider>
                <Logo className={site.theme} title={site.title} />
                <MenuList />
              </StyledSider>
            </Layout.Sider>

            <Layout style={{ background: '#fff' }}>
              <Layout.Header style={{ height: 48, lineHeight: 48, padding: 0 }}>
                <PageHeader />
              </Layout.Header>
              <Layout.Content
                style={{ background: '#f5f7fa', padding: 24, overflow: 'auto' }}
              >
                <Skeleton
                  active
                  loading={
                    workspaceStore.requestStates.loadList.status ===
                      'pending' || navigation.state === 'loading'
                  }
                >
                  <Outlet />
                </Skeleton>
              </Layout.Content>
            </Layout>
          </Layout>
        </MenuListContext.Provider>
      </ErrorBoundary>
    )
  );
});

export default Main;
