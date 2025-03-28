import { IconFilePencil } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import ReadonlyTextView from './View';

const widget: WidgetTypeConfig = {
  name: 'readonly-text',
  view: ReadonlyTextView,
  label: t('Readonly Text'),
  icon: IconFilePencil,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'value',
          label: t('Text'),
          control: ({ props }) => {
            return props.singleLine ? 'rich-input' : 'rich-text';
          },
        },
        {
          name: 'singleLine',
          label: t('Single Line'),
          control: 'boolean',
          defaultValue: false,
        },
      ],
    },
  ],
  styleGroups: [],
};

export default widget;
