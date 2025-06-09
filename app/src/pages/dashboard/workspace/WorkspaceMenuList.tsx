import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { MenuTheme } from 'antd';
import { Menu, Skeleton } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import ErrorMessage from '@/components/ErrorMessage';
import { ADMIN_BASE_URL } from '@/constants';
import { useSite, useUser } from '@/selectors';
import { useWorkspaceStore } from './selectors';
import WorkspaceMenuHeader from './WorkspaceMenuHeader';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  padding-top: 12px;
  padding-bottom: 24px;
  height: 200px;
  overflow-y: auto;
  /* border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary}; */
`;

interface WorkspaceMenuListProps {
  selectedKey: string;
}

const WorkspaceMenuList = observer((props: WorkspaceMenuListProps) => {
  const { selectedKey } = props;

  const site = useSite();
  const user = useUser();
  const navigate = useNavigate();

  const store = useWorkspaceStore();

  const wsMenus: MenuItemType[] = store.workspaces.map((item) => {
    return {
      key: item.id,
      label: item.title,
      style: {
        paddingRight: 4,
      },
    };
  });

  useEffect(() => {
    if (
      store.workspaces.length > 0 &&
      ((user.workspaceGranted &&
        location.pathname.replaceAll('/', '') ===
          ADMIN_BASE_URL.replaceAll('/', '')) ||
        !selectedKey)
    ) {
      navigate(`/workspace/${store.workspaces[0].id}`);
    }
  }, [store.workspaces, selectedKey]);

  return (
    <Skeleton
      loading={
        store.requestStates.loadList.status === 'pending' || user.initing
      }
      active
      style={{ padding: 12 }}
    >
      {store.requestStates.loadList.status === 'error' ? (
        <ErrorMessage>{store.requestStates.loadList.message}</ErrorMessage>
      ) : (
        <StyledContainer>
          <WorkspaceMenuHeader count={store.workspaces.length || 0} />
          <Menu
            theme={site.theme as MenuTheme}
            mode="inline"
            inlineIndent={8}
            items={wsMenus}
            style={{ borderInlineEnd: 'none' }}
            selectedKeys={[selectedKey]}
            onSelect={(info) => navigate(`/workspace/${info.key}`)}
          />
        </StyledContainer>
      )}
    </Skeleton>
  );
});

export default WorkspaceMenuList;
