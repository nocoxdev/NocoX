import { IconToggleLeft } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { richText } from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import SwitchView from './View';

const widget: WidgetTypeConfig = {
  name: 'switch',
  view: SwitchView,
  label: t('Switch'),
  icon: IconToggleLeft,
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
          name: 'checked',
          visible: false,
          computed: {
            default: ({ prop }) => {
              return { value: prop.value };
            },
          },
        },
        {
          name: 'defaultChecked',
          control: 'boolean',
          label: t('Default Checked'),
          defaultValue: false,
          computed: {
            edit: ({ prop }) => {
              return { value: prop.value };
            },
          },
        },
        {
          name: 'size',
          control: 'radio',
          label: t('Size'),
          helpText: t('Please set the size'),
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
          ...richText,
          name: 'checkedChildren',
          label: t('Checked Content'),
          helpText: t('Please enter the content when checked'),
          defaultValue: '',
        },
        {
          ...richText,
          name: 'unCheckedChildren',
          label: t('Unchecked Content'),
          helpText: t('Please enter the content when unchecked'),
          defaultValue: '',
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
