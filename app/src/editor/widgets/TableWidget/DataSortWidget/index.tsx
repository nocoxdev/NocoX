import { IconArrowsSort } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { size } from '../../config/generalProps';
import DataSortWidget from './View';

const widget: WidgetTypeConfig = {
  name: 'table-data-sort',
  view: DataSortWidget,
  label: t('Data Sort'),
  icon: IconArrowsSort,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: false,
  showToolbar: true,
  limit: {
    ancestor: ['table-toolbar'],
  },
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        size,
        {
          name: 'maskClosable',
          label: t('Click outside to close the popup'),
          control: 'boolean',
          defaultValue: true,
        },
      ],
    },
  ],
};

export default widget;
