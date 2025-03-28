import { type ReactNode, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { omit } from 'lodash-es';
import { useTreeNodeProps } from '@/editor/hooks/useTreeNodeProps';
import { useAppRunningMode } from '@/editor/selectors';
import type { MenuItemViewProps } from './MenuItemWidget/View';

interface MenuViewProps extends Omit<MenuProps, 'items'> {
  children?: ReactNode;
  style?: React.CSSProperties;
}

const MenuView = (props: MenuViewProps) => {
  const { children, ...rest } = props;
  const navigate = useNavigate();
  const mode = useAppRunningMode();
  const { pathname } = useLocation();

  const handleClick = (type: string, url?: string, page?: string) => {
    if (mode === 'edit') {
      return;
    }

    if (type !== 'url') {
      page && navigate(page);
    } else {
      window.open(url);
    }
  };

  const items = useTreeNodeProps<MenuItemViewProps>(children, (_, _props) => {
    const { urlType, url, page, ...rest } = _props;

    return {
      key: page,
      ...omit(rest, 'node'),
      onClick: () => {
        handleClick(_props.urlType, _props.url, _props.page);
      },
    };
  });

  const selectedKeys = useMemo(() => {
    const path = location.pathname
      .split(
        `/${mode === 'production' ? 'app' : mode === 'preview' ? 'preview' : ''}`,
      )
      .pop();

    return path ? [path] : [];
  }, [pathname]);
  return (
    <Menu
      {...rest}
      items={items as unknown as ItemType[]}
      selectedKeys={selectedKeys}
    />
  );
};

export default MenuView;
