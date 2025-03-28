import type { CSSProperties, ReactNode } from 'react';
import { Flex } from 'antd';
import { styled } from 'styled-components';

const StyledGroupTitle = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.controlHeight}px;
  color: ${({ theme }) => theme.colorTextTertiary};
  font-size: ${({ theme }) => theme.fontSize}px;
`;

interface NavigationGroupProps {
  label?: ReactNode;
  icon?: ReactNode;
  gap?: number;
  style?: CSSProperties;
  children?: ReactNode;
}

const NavigationGroup = (props: NavigationGroupProps) => {
  const { label, icon, style, gap, children } = props;

  return (
    <Flex vertical gap={gap || 2}>
      <StyledGroupTitle style={style}>
        {icon}
        {label}
      </StyledGroupTitle>
      {children}
    </Flex>
  );
};

export default NavigationGroup;
