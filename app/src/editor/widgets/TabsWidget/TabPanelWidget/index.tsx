import { IconFolder } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import TabPanelView from './View';

const widget: WidgetTypeConfig = {
  name: 'tab-panel',
  view: TabPanelView,
  label: t('Tab Panel'),
  icon: IconFolder,
  showInExplorer: false,
  canDrag: false,
  canDrop: true,
  canDelete: true,
  canCopy: false,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'key',
          label: t('Name'),
          control: 'input',
          visible: false,
        },
        {
          name: 'label',
          control: 'input',
          label: t('Label'),
        },
      ],
    },
  ],
  defaultTemplate: {
    name: 'tab-panel',
    elements: {
      children: [
        {
          name: 'inner-container',
        },
      ],
    },
  },

  styleGroups: [
    {
      name: 'general',
      label: t('Size'),
      description: t('Size'),
      children: [
        {
          name: 'height',
          control: 'height',
          label: t('Height'),
          defaultValue: '200px',
        },
      ],
    },
  ],
};

export default widget;
