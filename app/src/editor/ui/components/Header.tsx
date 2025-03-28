import { Breadcrumb, Flex } from 'antd';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { styled } from 'styled-components';
import { StyledHeaderContainer } from '@/components/common.styled';
import { LangSetting, UserAvatar } from '@/pages/common/PageHeader';

const StyledLeft = styled.div`
  display: flex;
  font-weight: 600;
  width: ${({ theme }) => (theme.widthDesignerLeftSidebar || 200) + 1}px;
  height: 100%;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  gap: 8px;
  padding-inline: 12px;
  box-sizing: border-box;
  font-size: 14px;
`;

export const StyledHeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: calc(
    100% - ${({ theme }) => (theme.widthDesignerLeftSidebar || 200) + 1}px
  );
  padding-inline: 20px;
`;

const StyledRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  min-width: 200px;
`;

// const StyledTitle = styled.div`
//   font-weight: 600;
//   color: ${({ theme }) => theme.colorText};
// `;

interface HeaderProps {
  title: React.ReactNode;
  items: ItemType[];
}

const Header = ({ title, items }: HeaderProps) => {
  return (
    <StyledHeaderContainer>
      <StyledLeft>{title}</StyledLeft>
      <StyledHeaderRightContainer>
        <div>{<Breadcrumb items={items} />}</div>
        <StyledRight>
          <Flex gap={12} align="center">
            <LangSetting />
            <UserAvatar />
          </Flex>
        </StyledRight>
      </StyledHeaderRightContainer>
    </StyledHeaderContainer>
  );
};

export default Header;
