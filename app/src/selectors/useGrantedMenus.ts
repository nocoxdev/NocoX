import type { MenuItemGroupType, MenuItemType } from 'antd/es/menu/interface';
import type { MergedMenuItemType } from '@/types';
import { useUser } from './useUser';

export const useGrantedMenus = (menus: MergedMenuItemType[]) => {
  const user = useUser();
  const { permissions } = user;

  const granted = (menu: MergedMenuItemType) => {
    const _menu = menu as MenuItemType & { personal: boolean };
    const key = (_menu.key as string).toLowerCase().replaceAll('-', '');
    return permissions
      .map((item) => item.groupName.toLowerCase().replaceAll(' ', ''))
      .includes(key);
  };

  return menus.reduce<MergedMenuItemType[]>((acc, menu) => {
    if (menu.type === 'divider') {
      acc.push(menu);
      return acc;
    }

    if (menu.type === 'group') {
      const group = menu as MenuItemGroupType;

      if (granted(group)) {
        acc.push(menu);
        return acc;
      }

      const children = group.children as MergedMenuItemType[];
      const visibleChildren = children.filter((child) => granted(child));
      visibleChildren.length > 0 &&
        acc.push({
          ...menu,
          children: visibleChildren,
        });
    } else {
      granted(menu) && acc.push(menu);
    }
    return acc;
  }, []);
};
