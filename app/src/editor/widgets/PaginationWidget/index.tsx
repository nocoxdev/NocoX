import { IconFileText } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import PaginationView from './View';

const widget: WidgetTypeConfig = {
  name: 'pagination',
  view: PaginationView,
  label: t('Pagination'),
  showInExplorer: false,
  icon: IconFileText,
  canDrag: false,
  canDrop: false,
  canDelete: false,
  canCopy: false,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'pageSize',
          label: t('Page Size'),
          control: 'number',
          defaultValue: 5,
        },
        {
          name: 'size',
          control: 'radio',
          label: t('Size'),
          helpText: t('Please set the size'),
          defaultValue: 'small',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Small'), value: 'small' },
              { label: t('Default'), value: 'default' },
            ],
          },
        },
        {
          name: 'position',
          control: 'select',
          label: t('Position'),
          defaultValue: 'bottomRight',
          controlProps: {
            options: [
              { label: t('Top Left'), value: 'topLeft' },
              { label: t('Top Center'), value: 'topCenter' },
              { label: t('Top Right'), value: 'topRight' },
              { label: t('Bottom Left'), value: 'bottomLeft' },
              { label: t('Bottom Center'), value: 'bottomCenter' },
              { label: t('Bottom Right'), value: 'bottomRight' },
            ],
            allowClear: false,
          },
          computed: {
            default: ({ prop }) => {
              return { position: prop.value };
            },
          },
        },
        {
          name: 'simple',
          label: t('Simple Mode'),
          control: 'switch',
          defaultValue: false,
        },
        // {
        //   name: "showTotal",
        //   label: "显示总数",
        //   control: "switch",
        //   defaultValue: true,
        //   helpText: "用于显示数据总量和当前数据顺序",
        // },
        {
          name: 'showTitle',
          label: t('Show Page Number Prompt'),
          control: 'switch',
          defaultValue: true,
          helpText: t(
            'Whether to display the native tooltip page number prompt',
          ),
        },
        {
          name: 'showSizeChanger',
          label: t('Show Page Size Changer'),
          control: 'switch',
          defaultValue: false,
          helpText: t(
            'Whether to display the pageSize changer, it will be true when total is greater than 50',
          ),
        },
        {
          name: 'showQuickJumper',
          label: t('Show Quick Jumper'),
          control: 'switch',
          defaultValue: false,
          helpText: t('Whether to allow quick jumping to a page'),
        },
        {
          name: 'hideOnSinglePage',
          label: t('Hide on Single Page'),
          control: 'switch',
          defaultValue: false,
          helpText: t(
            'Whether to hide the pagination when there is only one page, it will be displayed in the editor, please check in the preview',
          ),
          computed: {
            default: () => {
              return { hideOnSinglePage: false };
            },
          },
        },
        {
          name: 'responsive',
          label: t('Responsive'),
          control: 'switch',
          defaultValue: true,
          helpText: t(
            'When size is not specified, the size will be adjusted automatically according to the screen width',
          ),
        },
      ],
    },
  ],
  styleGroups: [],
};

export default widget;
