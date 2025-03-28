import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { LangSetting } from './LangSetting';
import { Question } from './Question';
import { Setting } from './Setting';
import { UserAvatar } from './UserAvatar';

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
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
  gap: 16px;
  padding-right: 12px;
`;

interface PageHeaderProps {
  setting?: boolean;
  children?: React.ReactNode;
}

const PageHeader = observer(({ children }: PageHeaderProps) => {
  return (
    <StyledContainer>
      <StyledLeft>{children}</StyledLeft>

      <StyledRight>
        <LangSetting />
        <UserAvatar />
      </StyledRight>
    </StyledContainer>
  );
});

export { UserAvatar, Setting, PageHeader, LangSetting, Question };
