import { IconCheckbox } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import CheckboxView from './View';

const widget: WidgetTypeConfig = {
  name: 'checkbox',
  view: CheckboxView,
  label: t('Checkbox'),
  icon: IconCheckbox,
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
          name: 'defaultChecked',
          control: 'boolean',
          label: t('Default Value'),
          helpText: t('Please set the default value'),
          defaultValue: false,
        },
        {
          name: 'label',
          label: t('Label'),
          control: 'input',
          defaultValue: t('Checkbox'),
        },
      ],
    },
  ],
  styleGroups: [],
};

export default widget;
