import { IconTornado } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { fillGroup } from '../config/generalStyle';
import { layoutGroup } from '../config/generalStyle';
import MenuView from './View';

const widget: WidgetTypeConfig = {
  name: 'menu',
  view: MenuView,
  label: t('Menu'),
  icon: IconTornado,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: true,
  canDrop: true,
  limit: {
    ancestor: ['layout-sider', 'layout-header'],
  },
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'theme',
          label: t('Theme'),
          control: 'radio',
          defaultValue: 'light',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Dark'), value: 'dark' },
              { label: t('Light'), value: 'light' },
            ],
          },
        },
        {
          name: 'mode',
          label: t('Mode'),
          control: 'radio',
          defaultValue: 'inline',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Inline'), value: 'inline' },
              { label: t('Horizontal'), value: 'horizontal' },
              { label: t('Vertical'), value: 'vertical' },
            ],
          },
        },
        {
          name: 'inlineIndent',
          label: t('Inline Indent'),
          control: 'number',
          defaultValue: 24,
          visible: ({ props }) => props.mode === 'inline',
        },
      ],
    },
  ],
  defaultTemplate: {
    name: 'menu',
    label: t('Menu'),
    elements: {
      children: [
        {
          name: 'menu-item',
          props: {
            label: t('Menu Item'),
            key: '1',
          },
          elements: {
            children: [
              {
                name: 'menu-item',
                props: {
                  label: t('Menu Item'),
                  key: '11',
                },
              },
              {
                name: 'menu-item',
                props: {
                  label: t('Menu Item'),
                  key: '22',
                },
              },
            ],
          },
        },
        {
          name: 'menu-item',
          props: {
            label: t('Menu Item'),
            key: '2',
          },
        },
      ],
    },
  },
  styleGroups: [fillGroup, layoutGroup],
};

export default widget;
