import type { CSSProperties } from 'react';
import { styled } from 'styled-components';

const StyledContainer = styled.div<{ $color?: string }>`
  position: absolute;
  top: -1px;
  left: -1px;
  box-sizing: border-box;
  overflow: visible;
  background-color: transparent;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  border-color: ${({ $color, theme }) => $color || theme.colorPrimary};
  pointer-events: none;
  &:hover {
    cursor: pointer;
  }
`;

export interface BorderProps {
  color?: string;
  style?: CSSProperties;
  className?: string;
}

const Border = (props: BorderProps) => {
  const { color, style, className } = props;
  return <StyledContainer $color={color} style={style} className={className} />;
};

export default Border;
