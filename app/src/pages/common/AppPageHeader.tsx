import { IconSearch } from '@tabler/icons-react';
import { Input } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import { Setting, UserAvatar } from './PageHeader';

const StyledContainer = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  padding-inline: 24px;
`;

const StyledLeft = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 24px;
`;

const StyledRight = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
  padding-right: 12px;
`;

interface AppPageHeaderProps {
  setting?: boolean;
}

const AppPageHeader = observer((props: AppPageHeaderProps) => {
  const theme = useTheme();
  const { setting = true } = props;

  return (
    <StyledContainer>
      <StyledLeft>
        <Input
          variant="filled"
          placeholder={t('Search')}
          size="small"
          prefix={<IconSearch size={14} color={theme.colorTextQuaternary} />}
          style={{ width: 300 }}
        />
      </StyledLeft>

      <StyledRight>
        {setting && <Setting key="Setting" />}
        <UserAvatar key="Avatar" />
      </StyledRight>
    </StyledContainer>
  );
});

export default AppPageHeader;
