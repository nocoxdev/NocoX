import { IconMenuDeep } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import MenuItemsGroupView from './View';

const widget: WidgetTypeConfig = {
  name: 'menu-items-group',
  view: MenuItemsGroupView,
  label: t('Group'),
  icon: IconMenuDeep,
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
        { name: 'type', visible: false, defaultValue: 'group' },
        {
          name: 'label',
          label: t('Label'),
          defaultValue: t('Menu Group'),
          control: 'input',
        },
      ],
    },
  ],
};

export default widget;
