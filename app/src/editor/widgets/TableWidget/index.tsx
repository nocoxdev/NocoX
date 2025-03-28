import { IconTable } from '@tabler/icons-react';
import { t } from 'i18next';
import type { IFilterInfo } from '@/components/DataFilter/type';
import type { ISortItem } from '@/components/DataSort/type';
import { AppDataApi } from '@/services/api';
import type { WidgetTypeConfig } from '@/types';
import {
  defaultAcitonsColumnTemplate,
  defaultIndexColumnTemplate,
  defaultTemplate,
} from './defaultTemplate';
import TableWidgetView from './View';

const widget: WidgetTypeConfig = {
  name: 'table',
  view: TableWidgetView,
  label: t('Table'),
  icon: IconTable,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  propGroups: [
    {
      name: 'data',
      label: t('Data'),
      description: t('Data'),
      children: [
        {
          name: 'dataTable',
          control: 'select',
          helpText: t('Bind Data Table'),
          label: t('Bind Data Table'),
          required: true,
          assist: true,
          validate: ({ prop: { value } }) => {
            const success = value && value.length > 0 ? true : false;
            return {
              success,
              message: success ? '' : t('Data Table cannot be empty'),
            };
          },
          controlProps: ({ app }) => {
            const options = app.tableStore.tables.map((item) => ({
              label: item.title,
              value: item.id,
            }));

            return { options, allowClear: false };
          },
          onChange: ({ app, node, page }, value) => {
            const table = app.tableStore.tables.find(
              (item) => item.id === value,
            );

            if (table) {
              app.modal.confirm({
                title: t('Are you sure to import all fields?'),
                onOk: () => {
                  const columns = node.getDescendantByName('table-columns');
                  if (columns) {
                    page.removeNodes(columns.map((item) => item.id));
                  }
                  const columnsTpl = table.columnStore.columns.map((field) => ({
                    name: 'table-column',
                    props: {
                      dataIndex: field.columnName,
                      title: field.title,
                      dataName: field.columnName,
                      dataValueType: field.uiType,
                    },
                    elements: {
                      cell: [
                        {
                          name: 'table-body-cell',
                          label: t('Cell'),
                        },
                      ],
                    },
                  }));

                  const template = {
                    name: 'table-columns',
                    elements: {
                      children: [
                        defaultIndexColumnTemplate,
                        ...columnsTpl,
                        defaultAcitonsColumnTemplate,
                      ],
                    },
                  };

                  const nodes = page.parseJson(template, node.id, 0, 'columns');
                  page.addNodes(node.id, 0, nodes);
                },
              });
            }
          },
        },
        {
          name: 'request',
          label: t('Request'),
          visible: false,
          computed: {
            default: ({ app, props }) => {
              const tableId = props.dataTable;

              const request = async (
                params: {
                  pageSize?: number;
                  current?: number;
                  keywords?: string;
                },
                sorts?: ISortItem[],
                filters?: IFilterInfo[],
              ) => {
                const { pageSize, current, keywords } = params;

                const resp = await AppDataApi.getPageList({
                  pageIndex: current ?? 1,
                  pageSize: pageSize ?? 6,
                  keywords: keywords ?? '',
                  tableId,
                  filter: filters?.[0],
                  sorts,
                });

                !resp.success && app.message.error(resp.message);

                return {
                  data: resp.data?.items.map((item) => ({
                    ...item,
                    id: item.id,
                  })),
                  success: resp.success,
                  total: resp.data?.totalCount,
                };
              };

              return { request: tableId ? request : undefined };
            },
          },
        },
        {
          name: 'data',
          visible: false,
          mode: 'edit',
        },
      ],
    },
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'size',
          control: 'radio',
          label: t('Density'),
          helpText: t(
            'Setting this property will make the density setting in the upper right corner of the table',
          ),
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Compact'), value: 'compact' },
              { label: t('Middle'), value: 'middle' },
              { label: t('Large'), value: 'large' },
            ],
          },
        },
        {
          name: 'rowKey',
          label: t('Row Key'),
          helpText: t(
            'The unique value in the data, the default is id, generated automatically by the system, not necessary to modify',
          ),
          control: 'input',
          defaultValue: 'id',
        },
        {
          name: 'columnEmptyText',
          label: t('Column Empty Text'),
          helpText: t(
            'The text displayed when the column is empty, the default is -',
          ),
          control: 'input',
          defaultValue: '-',
        },
        {
          name: 'enableSelection',
          label: t('Row Selection'),
          control: 'boolean',
          defaultValue: false,
          assist: true,
        },
        {
          name: 'rowSelection',
          label: t('Row Selection Type'),
          control: 'radio',
          defaultValue: 'checkbox',
          visible: ({ props }) => props.enableSelection,
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Radio'), value: 'radio' },
              { label: t('Checkbox'), value: 'checkbox' },
            ],
          },
          computed: {
            default: ({ prop, props }) => {
              if (props.enableSelection) {
                return { rowSelection: { type: prop.value } };
              }
              return undefined;
            },
          },
        },
        {
          name: 'ghost',
          label: t('Ghost'),
          control: 'switch',
          defaultValue: false,
        },
        {
          name: 'borders',
          label: t('Borders'),
          control: 'check-group',
          defaultValue: {
            bordered: false,
            cardBordered: false,
          },
          controlProps: {
            options: [
              { label: t('Internal Border'), value: 'bordered' },
              { label: t('External Border'), value: 'cardBordered' },
            ],
          },
        },
        {
          name: 'enableScroll',
          label: t('Scroll'),
          control: 'boolean',
          defaultValue: false,
          assist: true,
        },
        {
          name: 'scroll',
          label: t('Scroll Mode'),
          control: 'check-group',
          defaultValue: { x: false, y: false, scrollToFirstRowOnChange: false },
          visible: ({ props }) => props.enableScroll,
          computed: {
            default: ({ prop, props }) => {
              const enableScroll = props['enableScroll'];
              if (!enableScroll) {
                return { scroll: undefined };
              }
              return { scroll: prop.value };
            },
          },
          controlProps: {
            options: [
              {
                label: t('Scroll to Top on Change'),
                value: 'scrollToFirstRowOnChange',
              },
              { label: t('X-axis'), value: 'x' },
              { label: t('Y-axis'), value: 'y' },
            ],
          },
        },
        {
          name: 'options',
          label: t('Toolbar'),
          control: 'check-group',
          defaultValue: {
            density: true,
            fullScreen: true,
            reload: true,
            setting: true,
            search: false,
          },
          controlProps: {
            options: [
              { label: t('Density'), value: 'density' },
              { label: t('Full Screen'), value: 'fullScreen' },
              { label: t('Reload'), value: 'reload' },
              { label: t('Setting'), value: 'setting' },
            ],
          },
        },
        {
          name: 'shows',
          label: t('UI'),
          control: 'check-group',
          defaultValue: {
            toolbar: true,
            pagination: true,
            header: true,
          },
          controlProps: {
            options: [
              { label: t('Pagination'), value: 'pagination' },
              { label: t('Header'), value: 'header' },
            ],
          },
        },
      ],
    },
  ],
  actions: ['reload', 'deleteData'],
  styleGroups: [],
  defaultTemplate,
};

export default widget;
