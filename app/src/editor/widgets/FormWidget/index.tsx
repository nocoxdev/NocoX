import { IconAlignBoxLeftTop } from '@tabler/icons-react';
import { t } from 'i18next';
import { UiType, type WidgetTypeConfig } from '@/types';
import { size, variant } from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import { generateFormItemTemplate, getSubmitFormItem } from './utils';
import FormView from './View';

const widget: WidgetTypeConfig = {
  name: 'form',
  view: FormView,
  label: t('Form'),
  icon: IconAlignBoxLeftTop,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: true,
  canDrop: true,
  color: (theme) => theme.purple5,
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
              message: success ? '' : t('Data Table Cannot Be Empty'),
            };
          },
          onChange: ({ app, page, node }, value) => {
            const table = app.tableStore.tables.find(
              (item) => item.id === value,
            );

            if (table) {
              app.modal.confirm({
                title: t('Whether to automatically generate a form?'),
                onOk: () => {
                  const descendants = node.descendants;
                  if (descendants) {
                    page.removeNodes(descendants.map((item) => item.id));
                  }

                  const itemsTpl = table.columnStore.columns
                    .filter((item) => item.uiType !== UiType.Id)
                    .map((field) => generateFormItemTemplate(field));

                  const nodes = itemsTpl.flatMap((item, index) =>
                    page.parseJson(item, node.id, index, 'children', true),
                  );

                  const submitFormItemTpl = getSubmitFormItem();
                  const submitFormItemNode = page.parseJson(
                    submitFormItemTpl,
                    node.id,
                    itemsTpl.length,
                    'children',
                    true,
                  );
                  page.addNodes(node.id, 0, nodes.concat(submitFormItemNode));
                },
              });
            }
          },
          controlProps: ({ app }) => {
            const options = app.tableStore.tables.map((item) => ({
              label: item.title,
              value: item.id,
            }));

            return { options, allowClear: false };
          },
        },
        {
          name: 'type',
          label: t('Form Type'),
          control: 'radio',
          defaultValue: 'create',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Create'), value: 'create' },
              { label: t('Edit'), value: 'edit' },
              { label: t('View'), value: 'view' },
            ],
          },
        },
      ],
    },
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        size,
        variant,
        {
          name: 'labelAlign',
          label: t('Label Position'),
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
          name: 'colon',
          control: 'switch',
          label: t('Display Colon'),
          defaultValue: false,
          helpText: t(
            'Used with the label property, indicating whether to display the colon after the label',
          ),
        },
      ],
    },
    {
      name: 'layout',
      label: t('Layout'),
      description: t('General'),
      children: [
        {
          name: 'layout',
          label: t('Form Layout'),
          control: 'radio',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Horizontal'), value: 'horizontal' },
              { label: t('Vertical'), value: 'vertical' },
              { label: t('Inline'), value: 'inline' },
            ],
          },
        },
        {
          name: 'fieldsGutter',
          label: t('Fields Gutter'),
          helpText: t('Vertical spacing between form fields in the form'),
          control: 'number',
          defaultValue: 16,
        },
        {
          name: 'labelCol',
          label: t('Label Layout'),
          helpText: t('The ratio and offset of the label'),
          children: [
            {
              name: 'labelColSpan',
              control: 'number',
              label: t('Ratio'),
              defaultValue: 4,
              assist: true,
              span: 12,
              direction: 'horizontal',
              controlProps: {
                min: 0,
                max: 24,
              },
            },
            {
              name: 'labelColOffset',
              label: t('Offset'),
              control: 'number',
              defaultValue: 0,
              assist: true,
              span: 12,
              direction: 'horizontal',
              controlProps: {
                min: 0,
                max: 24,
              },
            },
          ],
          computed: {
            default: ({ props }) => {
              return {
                labelCol: {
                  span: props.labelColSpan,
                  offset: props.labelColOffset,
                },
              };
            },
          },
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],

  actions: ['submit'],
};

export default widget;
