import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { IconSettings } from '@tabler/icons-react';
import type { MenuTheme } from 'antd';
import { Menu, Skeleton, Splitter } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import { ADMIN_BASE_URL } from '@/constants';
import { useGrantedMenus, useSite, useUser } from '@/selectors';
import WorkspaceMenuList from '../workspace/WorkspaceMenuList';
import { menus } from './menus';

const StyledContainer = styled.div`
  height: calc(100vh - 48px);

  &.dark {
    .split-view-container {
      > .split-view-view:not(:first-child)::before {
        background-color: #444 !important;
      }
    }
  }
`;

const StyledMenus = styled.div`
  padding: 4px;
  padding-top: 12px;
`;

const MenuList = observer(() => {
  const site = useSite();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUser();

  const allowMenus = useGrantedMenus(menus);

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith(`${ADMIN_BASE_URL}/workspace`)) {
      return params.workspaceId || '';
    } else {
      const path = location.pathname.split('/').at(-1);
      return allowMenus.some((item) => item.key === path)
        ? path || ''
        : 'my-apps';
    }
  }, [location.pathname, params.workspaceId]);

  return (
    <StyledContainer className={site.theme}>
      <Splitter layout="vertical">
        {user.workspaceGranted && (
          <Splitter.Panel min={100} defaultSize={200}>
            <WorkspaceMenuList selectedKey={selectedKey} />
          </Splitter.Panel>
        )}
        <Splitter.Panel>
          <StyledMenus>
            <Skeleton loading={user.initing} active style={{ padding: 12 }}>
              <Menu
                theme={site.theme as MenuTheme}
                mode="inline"
                inlineIndent={8}
                items={allowMenus.concat({
                  icon: <AntdIcon content={IconSettings} />,
                  key: 'settings',
                  label: t('Settings'),
                })}
                selectedKeys={[selectedKey]}
                onSelect={(info) => {
                  navigate(`/${info.key}`);
                }}
                style={{ borderInlineEnd: 'none' }}
              />
            </Skeleton>
          </StyledMenus>
        </Splitter.Panel>
      </Splitter>
    </StyledContainer>
  );
});

export default MenuList;
