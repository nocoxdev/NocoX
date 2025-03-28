import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { styled } from 'styled-components';
import { useCurrentSize } from '../../hooks';

export const StyledContainer = styled.div<{ $height: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $height }) => $height - 2}px;
  height: ${({ $height }) => $height - 4}px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.colorTextSecondary};
  position: relative;
  transition: all 0.2s;
  cursor: pointer;

  svg {
    width: ${({ $height }) => $height / 2}px;
    height: ${({ $height }) => $height / 2}px;
  }

  &:hover {
    background: ${({ theme }) => theme.colorPrimaryBg};
  }

  &:active,
  &.active {
    background: ${({ theme }) => theme.colorPrimaryBgHover};
  }

  &.disabled {
    background: white;
    cursor: not-allowed;
    color: ${({ theme }) => theme.colorTextDisabled};
  }
`;

const CommonButton = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => {
  const { height } = useCurrentSize();

  return <StyledContainer {...props} $height={height} />;
};

export default CommonButton;
