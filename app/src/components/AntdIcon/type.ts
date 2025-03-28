import type { ComponentType } from 'react';
import type { IconProps } from '@tabler/icons-react';

export type AntdIconType = string | ComponentType<IconProps> | React.ReactNode;

export interface AntdIconProps {
  content: AntdIconType;
  color?: string;
  size?: string | number;
  stroke?: number;
  className?: string;
  style?: React.CSSProperties;
}
