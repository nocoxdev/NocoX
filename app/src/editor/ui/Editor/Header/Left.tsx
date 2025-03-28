import { IconArrowLeft } from '@tabler/icons-react';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import { ADMIN_BASE_URL } from '@/constants';
import { useApp } from '@/editor/selectors';
import EditAppName from '../../components/EditAppName';

const StyledContainer = styled.div`
  display: flex;
  width: ${({ theme }) => (theme.widthDesignerLeftSidebar || 200) + 1}px;
  height: 100%;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  gap: 8px;
  padding-inline: 12px;
`;

const Left = observer(() => {
  const theme = useTheme();
  const app = useApp();

  return (
    <StyledContainer>
      <Button
        type="text"
        size="small"
        onClick={() =>
          (location.href = `${ADMIN_BASE_URL}/workspace/${app?.workspaceId}`)
        }
      >
        <IconArrowLeft
          color={theme.colorPrimaryTextActive}
          stroke={1.5}
          size={14}
        />
      </Button>
      {app && <EditAppName />}
    </StyledContainer>
  );
});

export default Left;
