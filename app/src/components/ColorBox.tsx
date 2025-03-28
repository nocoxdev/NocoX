import { useMemo } from 'react';
import { presetPalettes } from '@ant-design/colors';
import styled, { useTheme } from 'styled-components';

const StyledColorBox = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadiusSM}px;
  border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
`;

type PresetColorType =
  | 'blue'
  | 'purple'
  | 'cyan'
  | 'green'
  | 'magenta'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'volcano'
  | 'geekblue'
  | 'lime'
  | 'gold';

export type ColorType =
  | 'default'
  | 'primary'
  | 'danger'
  | 'error'
  | 'success'
  | 'processing'
  | 'warning'
  | PresetColorType;

export interface ColorBoxProps {
  color: ColorType;
  size?: number;
}

const ColorBox = (props: ColorBoxProps) => {
  const theme = useTheme();

  const color = useMemo(() => {
    switch (props.color) {
      case 'primary':
        return theme.colorPrimary;
      case 'danger':
        return theme.colorError;
      case 'error':
        return theme.colorError;
      case 'success':
        return theme.colorSuccess;
      case 'processing':
        return theme.colorInfo;
      case 'warning':
        return theme.colorWarning;
      case 'default':
        return '#fff';
      default:
        return presetPalettes[props.color][5];
    }
  }, [props.color]);

  return <StyledColorBox color={color} size={props.size || 14} />;
};

export default ColorBox;
