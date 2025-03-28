import { IconListDetails } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import FormItemView from './View';

const widget: WidgetTypeConfig = {
  name: 'form-item',
  view: FormItemView,
  label: t('Form Item'),
  icon: IconListDetails,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: true,
  canDrop: false,
  limit: { ancestor: ['form'] },
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'wrapperCol',
          label: t('Component Layout'),
          helpText: t(
            'The ratio and offset of the component, for example, can be used when the label is empty',
          ),
          children: [
            {
              name: 'wrapperColSpan',
              control: 'number',
              label: t('Ratio'),
              defaultValue: 20,
              assist: true,
              span: 12,
              direction: 'horizontal',
              controlProps: {
                min: 0,
                max: 24,
              },
            },
            {
              name: 'wrapperColOffset',
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
                wrapperCol: {
                  span: props.wrapperColSpan,
                  offset: props.wrapperColOffset,
                },
              };
            },
          },
        },
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
          label: t('Display Colon'),
          control: 'radio',
          helpText: t(
            'Used with the label property, indicating whether to display the colon after the label',
          ),
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Display'), value: true },
              { label: t('Hide'), value: false },
            ],
          },
        },
        {
          name: 'required',
          control: 'boolean',
          label: t('Required'),
          defaultValue: false,
        },
        {
          name: 'noStyle',
          control: 'boolean',
          label: t('No Style'),
          defaultValue: false,
        },
        {
          name: 'tooltip',
          control: 'textarea',
          label: t('Field Prompt Information'),
          helpText: t(
            'Field prompt information, displayed in the form of a tooltip',
          ),
          defaultValue: '',
        },
        // {
        //   name: "extra",
        //   control: "textarea",
        //   label: "提示信息",
        //   defaultValue: "",
        // },
        // {
        //   name: "rules",
        //   control: "validation",
        //   label: "字段校验",
        //   helpText: "字段校验规则，可添加多个",
        // },
      ],
    },
  ],
  defaultTemplate: {
    name: 'form-item',
    elements: {
      label: [
        {
          name: 'flex',
          label: t('Form Item Title'),
          elements: {
            children: [
              {
                name: 'rich-text',
                props: { singleLine: true, value: t('Form Item') },
              },
            ],
          },
        },
      ],
      children: [
        {
          name: 'inner-container',
          label: t('Form Item Content'),
        },
      ],
    },
  },

  styleGroups: [],
};

export default widget;
