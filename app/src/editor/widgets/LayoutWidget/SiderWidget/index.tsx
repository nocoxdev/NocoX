import { IconLayoutSidebar } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { fillGroup, layoutGroup } from '../../config/generalStyle';
import SiderView from './View';

const widget: WidgetTypeConfig = {
  name: 'layout-sider',
  view: SiderView,
  label: t('Sider'),
  icon: IconLayoutSidebar,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: false,
  canDrop: true,
  limit: { parent: ['layout'] },

  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'width',
          label: t('Width'),
          control: 'size',
          defaultValue: '248px',
        },
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
          name: 'collapsible',
          label: t('Collapsible'),
          control: 'boolean',
          defaultValue: false,
        },
        {
          name: 'collapsedWidth',
          label: t('Collapsed Width'),
          control: 'number',
          defaultValue: 60,
          controlProps: {
            min: 40,
          },
        },
      ],
    },
  ],
  styleGroups: [fillGroup, layoutGroup],
};

export default widget;
