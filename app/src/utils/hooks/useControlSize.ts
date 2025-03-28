import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useTheme } from 'styled-components';

export function useControlSize(size?: SizeType) {
  const theme = useTheme();

  switch (size) {
    case 'small':
      return theme.controlHeightSM;
    case 'large':
      return theme.controlHeightLG;
    default:
      return theme.controlHeight;
  }
}
