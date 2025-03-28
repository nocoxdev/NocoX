import { IconTextSize } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { fillGroup, fontGroup } from '../config/generalStyle';
import SimpleTextView from './View';

const widget: WidgetTypeConfig = {
  name: 'simple-text',
  view: SimpleTextView,
  label: t('Text'),
  icon: IconTextSize,
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
          name: 'value',
          label: t('Text'),
          control: 'textarea',
          defaultValue: t('Text'),
          controlProps: {
            rows: 4,
          },
        },
      ],
    },
  ],
  styleGroups: [fontGroup, fillGroup],
};

export default widget;
