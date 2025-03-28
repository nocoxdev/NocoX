import type { ReactNode } from 'react';
import styled from 'styled-components';
import { default as defaultLogo } from '@/assets/logo.svg';
import MenuItem from './MenuItem';

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  width: 100%;
  border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  background-color: #fff;
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  > img {
    height: 20px;
  }
`;

const StyledMenus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-block: 12px;
`;

interface SiderMenuItem {
  name: string;
  title: string;
  icon: ReactNode;
  path: string;
}

interface SiderProps {
  menus: SiderMenuItem[];
  selected: string;
  onSelected: (name: string, path: string) => void;
}

const Sider = (props: SiderProps) => {
  const { menus, selected, onSelected } = props;

  return (
    <StyledContainer>
      <StyledLogo onClick={() => (location.href = '/')}>
        <img src={defaultLogo} alt="logo" />
      </StyledLogo>
      <StyledMenus>
        {menus.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => onSelected(item.name, item.path)}
            selected={selected === item.name}
            icon={item.icon}
            title={item.title}
          />
        ))}
      </StyledMenus>
    </StyledContainer>
  );
};

export default Sider;
