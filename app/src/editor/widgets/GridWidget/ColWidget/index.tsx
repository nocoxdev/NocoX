import { IconLayoutColumns } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import ColView from './View';

const widget: WidgetTypeConfig = {
  name: 'col',
  view: ColView,
  label: '列',
  icon: IconLayoutColumns,
  showInExplorer: false,
  canDrag: false,
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
          name: 'span',
          control: 'number',
          label: t('Ratio'),
          helpText: t('Column ratio, maximum value 24'),
          defaultValue: 4,
        },
        {
          name: 'offset',
          control: 'number',
          label: t('Offset'),
          defaultValue: 0,
        },
      ],
    },
  ],
  styleGroups: [],
};

export default widget;
