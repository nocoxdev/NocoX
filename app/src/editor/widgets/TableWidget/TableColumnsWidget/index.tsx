import { IconColumns2 } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import TableColumnsView from './View';

const widget: WidgetTypeConfig = {
  name: 'table-columns',
  view: TableColumnsView,
  label: t('Table Columns'),
  icon: IconColumns2,
  showInExplorer: false,
  canDrag: false,
  canDrop: true,
  canDelete: false,
  canCopy: false,
  limit: {
    children: ['table-column'],
  },
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'children',
          label: t('Table Columns'),
          control: 'widget',
          assist: true,
          controlProps: {
            add: () => ({
              name: 'table-column',
              props: {
                title: 'UnNamed',
                dataIndex: 'unnamed',
                valueType: 'text',
              },
            }),
          },
        },
      ],
    },
  ],
  styleGroups: [],
  defaultTemplate: { name: 'table-columns' },
};

export default widget;
