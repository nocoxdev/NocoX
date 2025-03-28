import { IconLayoutNavbar } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { generateKey } from '@/utils/helpers';
import { size } from '../config/generalProps';
import TabsWidget from './View';

const widget: WidgetTypeConfig = {
  name: 'tabs',
  view: TabsWidget,
  label: t('Tabs'),
  icon: IconLayoutNavbar,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'defaultActiveKey',
          control: 'select',
          label: t('Default Option'),
          controlProps: ({ node }) => {
            const items =
              node.children.filter((item) => item.attrName === 'items') || [];
            const options = items.map((item: any) => ({
              value: item.props['key'],
              label: item.props['label'],
            }));

            return { options };
          },
        },
        {
          name: 'centered',
          control: 'switch',
          label: t('Center'),
          defaultValue: false,
          controlProps: {
            size: 'small',
          },
        },
        size,
        {
          name: 'tabBarGutter',
          control: 'number',
          label: t('Tab Gap'),
          defaultValue: 32,
        },
        {
          name: 'type',
          control: 'radio',
          label: t('Type'),
          defaultValue: 'line',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Inline'), value: 'line' },
              { label: t('Card'), value: 'card' },
              // { label: "底部", value: "editable-card" },
            ],
          },
        },
        {
          name: 'tabPosition',
          control: 'radio',
          label: t('Position'),
          defaultValue: 'top',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Top'), value: 'top' },
              { label: t('Right'), value: 'right' },
              { label: t('Bottom'), value: 'bottom' },
              { label: t('Left'), value: 'left' },
            ],
          },
        },
        {
          name: 'items',
          control: 'widget',
          label: t('Tab'),
          assist: true,
          controlProps: {
            add: (index: number) => [
              {
                name: 'tab-panel',
                props: {
                  key: generateKey('tab'),
                  label: t(`Tab ${index + 1}`),
                },
              },
            ],
          },
        },
      ],
    },
  ],
  defaultTemplate: {
    name: 'tabs',
    elements: {
      items: [
        {
          name: 'tab-panel',
          props: { key: generateKey('tab'), label: t('Tab 1') },
        },
        {
          name: 'tab-panel',
          props: { key: generateKey('tab'), label: t('Tab 2') },
        },
      ],
    },
  },

  styleGroups: [
    {
      name: 'size',
      label: t('Size'),
      children: [
        {
          name: 'width',
          label: t('Width'),
          control: 'width',
          defaultValue: '100%',
        },
      ],
    },
  ],
};

export default widget;
