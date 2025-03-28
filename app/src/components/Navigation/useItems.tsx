import { useMemo } from 'react';
import NavigationDivider from './Divider';
import NavigationGroup from './Group';
import NavigationItem from './Item';
import type { NavItemType } from './type';

function renderItems(
  items: NavItemType[] | undefined,
  selectedKey: string,
  onSelect: (key: string) => void,
  depth = 0,
) {
  return (items || []).map((item) => {
    switch (item.type) {
      case 'group':
        return (
          <NavigationGroup
            key={item.key}
            label={item.label}
            icon={item.icon}
            gap={item.gap}
            style={{ paddingLeft: depth * 8, ...item.style }}
          >
            {renderItems(item.children, selectedKey, onSelect, depth + 1)}
          </NavigationGroup>
        );

      case 'divider':
        return (
          <NavigationDivider
            key={item.key}
            style={{ paddingLeft: depth * 8, ...item.style }}
          />
        );

      default:
        return (
          <NavigationItem
            key={item.key}
            label={item.label}
            icon={item.icon}
            onClick={() => onSelect(item.key)}
            selected={selectedKey === item.key}
            style={{ paddingLeft: depth * 8, ...item.style }}
          />
        );
    }
  });
}

export function useItems(
  items: NavItemType[],
  selectedKey: string,
  onSelect: (key: string) => void,
) {
  return useMemo(
    () => renderItems(items, selectedKey, onSelect),
    [items, selectedKey, onSelect],
  );
}
