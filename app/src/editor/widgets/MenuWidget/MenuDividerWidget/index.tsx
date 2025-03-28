import { IconSeparator } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import MenuDividerView from './View';

const widget: WidgetTypeConfig = {
  name: 'menu-divider',
  view: MenuDividerView,
  label: t('Divider'),
  icon: IconSeparator,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: true,
  canDrop: true,
  limit: {
    parent: ['menu'],
  },
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        { name: 'type', visible: false, defaultValue: 'divider' },
        {
          name: 'dashed',
          label: t('Dashed'),
          control: 'boolean',
          defaultValue: false,
        },
      ],
    },
  ],
};

export default widget;
