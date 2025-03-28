import { IconTooltip } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import TooltipView from './View';

const widget: WidgetTypeConfig = {
  name: 'tooltip',
  view: TooltipView,
  label: t('Tooltip'),
  icon: IconTooltip,
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,
  canCopy: true,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'title',
          label: t('Title'),
          helpText: t('Tooltip title'),
          control: 'input',
          defaultValue: 'prompt text',
        },
        {
          name: 'trigger',
          control: 'select',
          label: t('Trigger'),
          controlProps: () => {
            const options = [
              { value: 'click', label: t('Click') },
              { value: 'hover', label: t('Hover') },
            ];

            return { options, mode: 'multiple' };
          },
        },
      ],
    },
  ],
  styleGroups: [],
};

export default widget;
