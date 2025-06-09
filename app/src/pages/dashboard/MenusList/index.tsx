import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import type { MenuTheme } from 'antd';
import { Menu, Skeleton } from 'antd';
import type { MenuItemGroupType } from 'antd/es/menu/interface';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { ADMIN_BASE_URL } from '@/constants';
import { useGrantedMenus, useSite, useUser } from '@/selectors';
import WorkspaceMenuList from '../workspace/WorkspaceMenuList';
import { menus } from './menus';

const StyledContainer = styled.div`
  height: calc(100vh - 48px);
  overflow-y: auto;

  .ant-menu-title-content {
    color: ${({ theme }) => theme.colorTextSecondary};
  }
`;

const StyledMenus = styled.div`
  padding: 4px;
  padding-top: 12px;

  .ant-menu-item-icon {
    svg {
      color: ${({ theme }) => theme.colorTextSecondary} !important;
      width: 14px;
      height: 14px;
    }
  }

  .ant-menu-title-content {
    margin-inline-start: 12px !important;
  }

  .ant-menu {
    .ant-menu-item-group {
      padding-bottom: 12px;
      .ant-menu-item-group-title {
        padding-inline: 12px;
        padding-block: 8px 4px;
      }
    }
  }
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
      return ((allowMenus as MenuItemGroupType[]) || [])
        .flatMap((item) => item.children)
        .some((item) => item?.key === path)
        ? path || ''
        : 'my-apps';
    }
  }, [location.pathname, params.workspaceId]);

  const visableMenus = useMemo(() => {
    return allowMenus;
  }, [allowMenus]);

  return (
    <StyledContainer className={site.theme}>
      {user.workspaceGranted && <WorkspaceMenuList selectedKey={selectedKey} />}
      <StyledMenus>
        <Skeleton loading={user.initing} active style={{ padding: 12 }}>
          <Menu
            theme={site.theme as MenuTheme}
            mode="inline"
            inlineIndent={8}
            items={visableMenus as any}
            selectedKeys={[selectedKey]}
            onSelect={(info) => {
              navigate(`/${info.key}`);
            }}
            style={{ borderInlineEnd: 'none' }}
          />
        </Skeleton>
      </StyledMenus>
    </StyledContainer>
  );
});

export default MenuList;
