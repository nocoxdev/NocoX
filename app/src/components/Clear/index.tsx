import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import classNames from 'classnames';
import { styled } from 'styled-components';

const StyledClear = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadiusSM}px;
  border: ${({ theme }) => theme.lineWidth}px solid
    ${({ theme }) => theme.colorSplit};
  cursor: pointer;
  overflow: hidden;
  margin-inline-start: auto;
  margin-bottom: ${({ theme }) => theme.marginXS}px;

  &.sm {
    width: ${({ theme }) => theme.controlHeightSM}px;
    height: ${({ theme }) => theme.controlHeightSM}px;
  }

  &.md {
    width: ${({ theme }) => theme.controlHeight}px;
    height: ${({ theme }) => theme.controlHeight}px;
  }

  &.lg {
    width: ${({ theme }) => theme.controlHeightLG}px;
    height: ${({ theme }) => theme.controlHeightLG}px;
  }

  &::after {
    position: absolute;
    top: 0;
    display: block;
    width: 40px;
    height: 2px;
    background-color: ${({ theme }) => theme.colorError};
    transform: rotate(-45deg);
    transform-origin: right;
    content: '';
    inset-inline-end: 1px;
  }
`;

export interface ClearProps {
  size?: SizeType;
  onClick?: () => void;
}

const Clear = (props: ClearProps) => {
  const { size = 'middle', onClick } = props;

  return (
    <StyledClear
      onClick={() => onClick?.()}
      className={classNames({
        sm: size === 'small',
        md: size === 'middle',
        lg: size === 'large',
      })}
    ></StyledClear>
  );
};

export default Clear;
