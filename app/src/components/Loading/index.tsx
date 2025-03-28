import type { SpinProps } from 'antd';
import { Spin } from 'antd';
import { keyframes, styled } from 'styled-components';

const animation = keyframes`
   to {
      clip-path: inset(0 -34% 0 0);
    }
`;

const StyledIndicator = styled.div<{
  $size: number;
  $color?: string;
  $danger?: boolean;
}>`
  width: ${({ $size }) => $size * 4}px !important;
  height: ${({ $size }) => $size}px !important;
  aspect-ratio: 4;
  background: radial-gradient(
      circle closest-side,
      ${({ theme, $color, $danger }) =>
          $danger ? theme.colorError : $color || theme.colorPrimary}
        90%,
      #0000
    )
    0 / calc(100% / 3) 100% space;
  clip-path: inset(0 100% 0 0);
  animation: ${animation} 1s steps(4) infinite;
  margin-inline: ${({ $size }) => -$size * 2}px !important;
  margin-block: ${({ $size }) => -$size / 2}px !important;
`;

export interface LoadingProps extends Omit<SpinProps, 'size'> {
  size?: number;
  color?: string;
  danger?: boolean;
}

const Loading = (props: LoadingProps) => {
  const { size = 8, color, danger, style, ...restProps } = props;

  return (
    <Spin
      {...restProps}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      indicator={
        <StyledIndicator $size={size} $color={color} $danger={danger} />
      }
    />
  );
};

export default Loading;
