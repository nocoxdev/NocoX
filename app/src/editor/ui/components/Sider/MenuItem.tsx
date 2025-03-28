import type { ReactNode } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => theme.controlHeightSM}px;
  width: ${({ theme }) => theme.controlHeightSM}px;
  cursor: pointer;
  color: ${({ theme }) => theme.colorTextSecondary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  transition: all 0.2s;

  > svg {
    height: 16px;
    width: 16px;
    stroke-width: 1.5;
  }

  &.selected {
    color: ${({ theme }) => theme.colorPrimaryText};
    background-color: ${({ theme }) => theme.colorPrimaryBg};
    box-shadow: ${({ theme }) => theme.boxShadowTertiary};
    > svg {
      stroke-width: 2;
    }
  }

  &:hover:not(.selected) {
    background-color: ${({ theme }) => theme.colorFillTertiary};
    box-shadow: ${({ theme }) => theme.boxShadowTertiary};
    color: ${({ theme }) => theme.colorTextSecondary};
  }
`;

interface MenuItemProps {
  selected?: boolean;
  icon: ReactNode;
  title?: string;
  onClick?: () => void;
}

const MenuItem = (props: MenuItemProps) => {
  const { selected, icon, title, onClick } = props;

  return (
    <Tooltip title={title} placement="right">
      <StyledContainer onClick={onClick} className={classNames({ selected })}>
        {icon}
      </StyledContainer>
    </Tooltip>
  );
};

export default MenuItem;
