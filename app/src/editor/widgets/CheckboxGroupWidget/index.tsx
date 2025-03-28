import { IconCopyCheck } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import CheckboxGroupView from './View';

const widget: WidgetTypeConfig = {
  name: 'checkbox-group',
  view: CheckboxGroupView,
  label: t('Checkboxs'),
  icon: IconCopyCheck,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  color: (theme) => theme.green6,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'defaultValue',
          control: 'select',
          label: t('Default Value'),
          helpText: t('Please set the default value'),
          defaultValue: [],
          controlProps: ({ props }) => {
            return { options: props.options, mode: 'multiple', maxTagCount: 2 };
          },
          computed: {
            edit: ({ prop }) => {
              return { value: prop.value };
            },
          },
        },
        {
          name: 'options',
          control: 'options',
          label: t('Options'),
          helpText: t('Please set the options'),
          defaultValue: {
            type: 'custom',
            options: [
              {
                label: t('Option 1'),
                value: 'option1',
              },
              {
                label: t('Option 2'),
                value: 'option2',
              },
              {
                label: t('Option 3'),
                value: 'option3',
              },
            ],
          },
        },
      ],
    },
  ],
  styleGroups: [],
};

export default widget;
