import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { styled } from 'styled-components';
import { useControlSize } from '@/utils/hooks';

const StyledContainer = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size - 12}px;
  height: ${({ $size }) => $size - 12}px;
  border-radius: 1px;
  border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  position: relative;
  overflow: hidden;
  transition: all 0.1s;

  &:hover {
    border-color: ${({ theme }) => theme.colorBorder};
  }

  &::after {
    content: '';
    position: absolute;
    inset-inline-end: -1px;
    top: -1px;
    display: block;
    width: 40px;
    height: 2px;
    transform-origin: calc(100% - 1px) 1px;
    transform: rotate(-45deg);
    background-color: ${({ theme }) => theme.red6};
  }
`;

interface IconClearProps {
  size: SizeType;
}

const IconClear = (props: IconClearProps) => {
  const { size } = props;

  const height = useControlSize(size);

  return <StyledContainer $size={height}></StyledContainer>;
};

export default IconClear;
