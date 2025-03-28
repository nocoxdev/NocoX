import { type ReactNode } from 'react';
import type { MenuItemProps } from 'antd/es/menu';

export interface MenuItemViewProps extends MenuItemProps {
  urlType: 'page' | 'url';
  url?: string;
  page?: string;
  children?: ReactNode;
}

const MenuItemView = (_: MenuItemViewProps) => {
  return null;
};

export default MenuItemView;
