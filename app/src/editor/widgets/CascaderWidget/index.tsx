import { IconMenuDeep } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { size, variant } from '../config/generalProps';
import CascaderView from './View';

const widget: WidgetTypeConfig = {
  name: 'cascader',
  view: CascaderView,
  label: t('Cascader'),
  icon: IconMenuDeep,
  tags: ['cascader', '级联选择', '级联', '选择', '级联选择器'],
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
        size,
        variant,
        {
          name: 'expandTrigger',
          control: 'radio',
          label: t('Expand Trigger'),
          helpText: t('Please set the expand trigger'),
          defaultValue: 'click',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Click'), value: 'click' },
              { label: t('Hover'), value: 'hover' },
            ],
          },
        },
        {
          name: 'options',
          control: 'tree-options',
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
