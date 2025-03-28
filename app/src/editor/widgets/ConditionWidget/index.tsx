import { IconHierarchy } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import ConditionCellView from './View';

const widget: WidgetTypeConfig = {
  name: 'condition',
  view: ConditionCellView,
  label: t('Condition'),
  icon: IconHierarchy,
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,
  canCopy: true,
  propGroups: [
    {
      name: 'data',
      label: t('Data'),
      description: t('Data'),
      children: [
        {
          name: 'visible',
          control: 'switch',
          label: t('Always Display'),
          helpText: t(
            'Whether to always display, design-time auxiliary property',
          ),
          defaultValue: true,
        },
        {
          name: 'filter',
          control: 'condition',
          helpText: t('Display Condition'),
          label: t('Display Condition'),
          controlProps: ({ node }) => {
            const fields = node.contextStates.map((state) => ({
              name: state.name,
              title: state.title,
              fields: state.items.map((item) => ({
                name: item.name,
                title: item.title,
                valueType: item.valueType,
              })),
            }));

            return { fields };
          },
        },
      ],
    },
  ],
};

export default widget;
