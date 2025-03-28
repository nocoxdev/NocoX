import { IconColumns1 } from '@tabler/icons-react';
import { t } from 'i18next';
import { toJSX } from '@/components/PlateEditor/utils';
import type { WidgetTypeConfig } from '@/types';
import { actionsField, columnTypes, indexField } from '../constants';
import TableColumnView from './View';

const widget: WidgetTypeConfig = {
  name: 'table-column',
  view: TableColumnView,
  label: t('Column'),
  icon: IconColumns1,
  showInExplorer: false,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  limit: {
    parent: ['table-columns'],
  },
  propGroups: [
    {
      name: 'data',
      label: t('Data'),
      description: t('Data'),
      children: [
        {
          name: 'dataIndex',
          control: 'select',
          helpText: t('Bind the field in the data table'),
          label: t('Bind Field'),
          required: true,
          controlProps: ({ app, node }) => {
            const tableNode = node.getAncestorByName('table');
            const bindDataTableId = tableNode?.props.record['dataTable'];
            const options =
              app.tableStore.tables
                .find((t) => t.id === bindDataTableId)
                ?.columnStore.columns.map((item) => ({
                  value: item.columnName,
                  label: item.title,
                })) || [];

            return {
              options: [indexField, ...options, actionsField],
              allowClear: true,
            };
          },
          validate: ({ node, prop: { value } }) => {
            const tableNode = node.getAncestorByName('table');

            if (!tableNode) {
              return {
                success: false,
                message: t('Please place the component in the table'),
              };
            }

            const bindDataTableId = tableNode?.props.record['dataTable'];

            if (!bindDataTableId) {
              return {
                success: false,
                message: t('Please bind the data table'),
              };
            }

            const success = value && value.length > 0 ? true : false;
            return {
              success,
              message: success ? '' : t('The data field cannot be empty'),
            };
          },
        },
      ],
    },
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'title',
          label: t('Title'),
          control: 'rich-input',
          defaultValue: '',
          computed: {
            default: ({ prop }) => {
              const title = prop.value;
              return {
                title: toJSX(title, true),
              };
            },
          },
        },
        {
          name: 'tooltip',
          label: t('Tooltip'),
          control: 'input',
        },
        {
          name: 'dataValueType',
          control: 'input',
          visible: false,
        },
        {
          name: 'valueType',
          label: t('Display Type'),
          helpText: t('The display type of the table column'),
          control: 'select',
          defaultValue: 'text',
          controlProps: {
            options: columnTypes,
          },
        },
        {
          name: 'functions',
          label: t('Functions'),
          control: 'check-group',
          defaultValue: {
            ellipsis: true,
          },
          controlProps: {
            options: [
              // { label: '筛选', value: 'filtered' },
              // { label: '排序', value: 'sorter' },
              { label: t('Collapse'), value: 'ellipsis' },
              // { label: '隐藏', value: 'hideInTable' },
              { label: t('Copy'), value: 'copyable' },
            ],
          },
          computed: {
            default: ({ prop }) => {
              return prop.value;
            },
          },
        },
        {
          name: 'align',
          label: t('Alignment'),
          control: 'radio',
          defaultValue: 'left',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Left'), value: 'left' },
              { label: t('Center'), value: 'center' },
              { label: t('Right'), value: 'right' },
            ],
          },
        },
        {
          name: 'fixed',
          label: t('Fixed'),
          control: 'radio',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Left'), value: 'left' },
              { label: t('Right'), value: 'right' },
            ],
          },
        },
        {
          name: 'width',
          label: t('Width'),
          control: 'size',
        },
        {
          name: 'cell',
          control: 'widget',
          visible: false,
          treeVisible: ({ props }) => {
            return props.valueType === 'custom';
          },
        },
      ],
    },
  ],
};

export default widget;
