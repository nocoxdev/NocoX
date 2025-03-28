import { IconLink } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import DataItemView from './View';

const widget: WidgetTypeConfig = {
  name: 'form-data-item',
  view: DataItemView,
  label: t('Data Item'),
  icon: IconLink,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: true,
  canDrop: true,
  limit: { ancestor: ['form'], childrenMaxCount: 1 },
  propGroups: [
    {
      name: 'data',
      label: t('Data'),
      description: t('Data'),
      children: [
        {
          name: 'name',
          control: 'select',
          helpText: t('Bind the field in the data table'),
          label: t('Bind Field'),
          required: true,
          controlProps: ({ app, node }) => {
            const formNode = node.getAncestorByName('form');
            const table = formNode?.props.record['dataTable'];

            const options = app.tableStore.tables
              .find((t) => t.id === table)
              ?.columnStore.columns.map((item) => ({
                value: item.columnName,
                label: item.title,
              }));

            return { options, allowClear: false };
          },
          validate: ({ node, prop: { value } }) => {
            const formNode = node.getAncestorByName('form');

            if (!formNode) {
              return {
                success: false,
                message: t('Please place the component in the form'),
              };
            }

            const table = formNode?.props.record['dataTable'];

            if (!table) {
              return {
                success: false,
                message: t('Please bind the data table to the form'),
              };
            }

            const success = value && value.length > 0 ? true : false;
            return {
              success,
              message: success ? '' : t('The data field cannot be empty'),
            };
          },
        },
        {
          name: 'value',
          visible: false,
          mode: 'production',
        },
        {
          name: 'validations',
          control: 'validation',
          helpText: t('Field validation rules, can add multiple'),
          label: t('Validation'),
          defaultValue: [],
        },
      ],
    },
  ],
  styleGroups: [
    {
      name: 'layout',
      label: t('Layout'),
      children: [
        {
          name: 'width',
          label: t('Width'),
          control: 'width',
          defaultValue: { width: '100%' },
        },
      ],
    },
  ],
};

export default widget;
