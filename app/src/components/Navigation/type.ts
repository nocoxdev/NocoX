import type { CSSProperties, ReactNode } from 'react';

export interface NavItemType {
  key: string;
  icon?: ReactNode;
  label?: ReactNode;
  type?: 'group' | 'divider' | 'item';
  style?: CSSProperties;
  gap?: number;
  children?: NavItemType[];
}
