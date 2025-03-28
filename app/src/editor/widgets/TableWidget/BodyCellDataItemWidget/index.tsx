import { IconCrop75 } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import ColumnDataItemView from './View';

const widget: WidgetTypeConfig = {
  name: 'table-body-cell-data-item',
  view: ColumnDataItemView,
  label: t('Data Item'),
  icon: IconCrop75,
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,
  canCopy: true,
  limit: {
    ancestor: ['table-body-cell'],
    childrenMaxCount: 1,
  },
  propGroups: [
    {
      name: 'data',
      label: t('Data'),
      description: t('Data'),
      children: [
        {
          name: 'fieldName',
          control: 'select',
          helpText: t('Bind the field to be queried, empty means fuzzy query'),
          label: t('Bind Field'),
          controlProps: ({ app, node }) => {
            const tableNode = node.getAncestorByName('table');
            const bindDataTableId = tableNode?.props.record['dataTable'];
            const options = app.tableStore.tables
              .find((t) => t.id === bindDataTableId)
              ?.columnStore.columns.map((item) => ({
                value: item.columnName,
                label: item.title,
              }));

            return { options, allowClear: true };
          },
        },
      ],
    },
  ],
};

export default widget;
