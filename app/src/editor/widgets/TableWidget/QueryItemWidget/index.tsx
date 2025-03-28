import { IconSearch } from '@tabler/icons-react';
import { t } from 'i18next';
import { operators } from '@/components/DataFilter/config';
import type { WidgetTypeConfig } from '@/types';
import SearchFormView from './View';

const widget: WidgetTypeConfig = {
  name: 'table-query-item',
  view: SearchFormView,
  label: t('Query Item'),
  icon: IconSearch,
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,
  canCopy: true,
  limit: {
    ancestor: ['table-toolbar'],
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
                value: item.id,
                label: item.title,
              }));

            return { options, allowClear: true };
          },
        },
        {
          name: 'operator',
          control: 'select',
          helpText: t('Query Condition'),
          label: t('Query Condition'),
          controlProps: {
            options: operators.map((item) => ({
              value: item.operator,
              label: item.label,
            })),
          },
        },
      ],
    },
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [],
    },
  ],
  styleGroups: [],
};

export default widget;
