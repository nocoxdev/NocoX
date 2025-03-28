import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { t } from 'i18next';
import NoWidget from '@/components/NoWidget';
import { useArrayNodeProps } from '@/editor/hooks';

export type TabsWidgetProps = Omit<TabsProps, 'children' | 'items'> & {
  items: React.ReactNode[];
};

const TabsWidget = (props: TabsWidgetProps) => {
  const { items, className, ...restProps } = props;

  const [_items] = useArrayNodeProps<any>(items, (key, props) => {
    return {
      key,
      ...props,
      style: { ...props, height: '100%', minHeight: 100 },
      className: props.className,
      children: props.children || (
        <NoWidget
          style={{ height: '100%', minHeight: 100 }}
          description={t('Drag components here')}
        />
      ),
    };
  });

  return <Tabs {...restProps} rootClassName={className} items={_items} />;
};

export default TabsWidget;
