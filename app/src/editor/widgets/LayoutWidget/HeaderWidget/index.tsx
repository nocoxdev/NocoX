import { IconLayoutNavbar } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import HeaderView from './View';

const widget: WidgetTypeConfig = {
  name: 'layout-header',
  view: HeaderView,
  label: t('Header'),
  icon: IconLayoutNavbar,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: true,
  canDrop: true,
  limit: { parent: ['layout'] },
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [],
    },
  ],
  styleGroups: [
    {
      name: 'layout',
      label: t('Layout'),
      children: [
        {
          name: 'width',
          label: t('Width'),
          control: 'width',
        },
        {
          name: 'height',
          label: t('Height'),
          control: 'height',
          defaultValue: {
            height: '48px',
          },
        },
        {
          name: 'border',
          label: t('Border'),
          control: 'border',
        },
        {
          name: 'corner',
          label: t('Corner'),
          control: 'corner',
        },
        {
          name: 'padding',
          label: t('Padding'),
          control: 'padding',
          defaultValue: {
            padding: '0 16px',
          },
        },
        {
          name: 'margin',
          label: t('Margin'),
          control: 'margin',
        },
      ],
    },
  ],
};

export default widget;
