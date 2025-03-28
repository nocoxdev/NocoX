import type { CSSProperties } from 'react';
import { useControllableValue } from 'ahooks';
import { Flex } from 'antd';
import type { NavItemType } from './type';
import { useItems } from './useItems';

interface NavigationProps {
  items: NavItemType[];
  className?: string;
  style?: CSSProperties;
  selectedKey?: string;
  defaultSelectedKey?: string;
  gap?: number;
  onSelect?: (key: string) => void;
}

const Navigation = (props: NavigationProps) => {
  const { items, className, gap, style } = props;

  const [selectedKey, setSelectedKey] = useControllableValue<string>(props, {
    defaultValuePropName: 'defaultSelectedKey',
    valuePropName: 'selectedKey',
    trigger: 'onSelect',
  });

  const children = useItems(items, selectedKey, setSelectedKey);

  return (
    <Flex vertical className={className} style={style} gap={gap || 4}>
      {children}
    </Flex>
  );
};

export default Navigation;
