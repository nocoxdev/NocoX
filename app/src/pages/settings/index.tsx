import { Suspense, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import {
  IconArrowLeft,
  IconLock,
  IconUser,
  IconUserCircle,
  IconUserCog,
} from '@tabler/icons-react';
import type { MenuTheme } from 'antd';
import { Button, Layout, Menu, Skeleton, Spin, Tooltip } from 'antd';
import type { SiderTheme } from 'antd/es/layout/Sider';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useGrantedMenus, useSite, useUser } from '@/selectors';
import type { MergedMenuItemType } from '@/types';
import { PageHeader } from '../common/PageHeader';

const StyledSider = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  padding-inline: 4px;

  .ant-menu-item-group {
    margin-bottom: 16px;
    padding-inline: 0px;
    .ant-menu-item-group-title {
      font-weight: 600;
      padding-block: 4px;
    }
  }
  .ant-menu-item {
    font-weight: 600;
  }
`;

const StyledTitleContainer = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  padding-inline: 4px;
  gap: 8px;
  /* border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary}; */

  > :last-child {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colorText};
  }
`;

const menus: MergedMenuItemType[] = [
  {
    key: 'account',
    label: t('Account'),
    type: 'group',

    children: [
      {
        icon: <AntdIcon content={IconUser} />,
        key: 'profile',
        label: t('Profile'),
      },
      {
        icon: <AntdIcon content={IconLock} />,
        key: 'password',
        label: t('Password'),
      },
    ],
  },
  {
    key: 'user-management',
    label: t('User Management'),
    type: 'group',
    children: [
      {
        icon: <AntdIcon content={IconUserCircle} />,
        key: 'users',
        label: t('Users'),
      },
      {
        icon: <AntdIcon content={IconUserCog} />,
        key: 'roles',
        label: t('Roles'),
      },
    ],
  },
  {
    key: 'resource-management',
    label: t('Resource Management'),
    type: 'group',
    children: [
      {
        icon: <AntdIcon content={IconUserCircle} />,
        key: 'resource',
        label: t('Resource'),
      },
    ],
  },
];

const Settings = observer(() => {
  const theme = useTheme();
  const site = useSite();
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const allowMenus = useGrantedMenus(menus);
  const selectedKey = useMemo(() => {
    return location.pathname.split('/')[2] || 'profile';
  }, [location.pathname]);

  return (
    <ErrorBoundary onReset={() => window.location.reload()}>
      <Layout style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Layout.Sider
          theme={site.theme as SiderTheme}
          collapsedWidth={56}
          width={theme.widthMenu}
        >
          <StyledSider>
            <StyledTitleContainer>
              <Tooltip title={t('Back')} placement="top">
                <Button type="text" onClick={() => navigate('/')} size="small">
                  <IconArrowLeft
                    size={12}
                    color={theme.colorPrimaryTextActive}
                  />
                </Button>
              </Tooltip>
              <span>{t('Setting')}</span>
            </StyledTitleContainer>
            <Skeleton active loading={user.initing} style={{ padding: 12 }}>
              <Menu
                theme={site.theme as MenuTheme}
                mode="inline"
                inlineIndent={8}
                items={allowMenus}
                selectedKeys={[selectedKey]}
                onSelect={(info) => navigate(`/settings/${info.key}`)}
                style={{ borderInlineEnd: 'none', paddingBlock: 12 }}
              />
            </Skeleton>
          </StyledSider>
        </Layout.Sider>

        <Layout style={{ background: '#fff' }}>
          <Layout.Header style={{ height: 48, lineHeight: 48, padding: 0 }}>
            <PageHeader></PageHeader>
          </Layout.Header>
          <Layout.Content
            style={{ background: '#f5f7fa', padding: 24, overflow: 'auto' }}
          >
            <Skeleton active loading={user.initing}>
              <Outlet />
            </Skeleton>
          </Layout.Content>
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
});

export default Settings;
