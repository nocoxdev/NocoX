import type { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { styled } from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  height: ${({ theme }) => theme.controlHeight}px;
  padding: 0 8px;
  transition: all 0.2s;
  box-sizing: border-box;
  cursor: pointer;
  &.selected {
    color: ${({ theme }) => theme.colorPrimaryText};
    background-color: ${({ theme }) => theme.controlItemBgActive};
  }
  &:hover {
    background-color: ${({ theme }) => theme.controlItemBgHover};
  }
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 20px;
  img {
    width: 16px;
    height: 16px;
  }
`;

const StyledLabel = styled.div`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  position: relative;
`;

interface NavigationItemProps {
  icon?: ReactNode;
  label?: ReactNode;
  style?: CSSProperties;
  selected?: boolean;
  gap?: number;
  theme?: 'dark' | 'light';
  onClick?: () => void;
}

const NavigationItem = (props: NavigationItemProps) => {
  const { icon, label, theme, selected, gap, style, onClick } = props;

  return (
    <StyledContainer
      className={classNames({ selected, theme })}
      onClick={onClick}
      style={{ gap, ...style }}
    >
      {icon && <StyledIcon>{icon}</StyledIcon>}
      <StyledLabel style={{ width: icon ? 'calc(100% - 30px)' : '100%' }}>
        {label}
      </StyledLabel>
    </StyledContainer>
  );
};

export default NavigationItem;
