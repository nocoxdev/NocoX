import { IconFilePencil } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { layoutGroup } from '../config/generalStyle';
import RichTextView from './View';

const widget: WidgetTypeConfig = {
  name: 'rich-text',
  view: RichTextView,
  label: t('Rich Text'),
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
          defaultValue: 'Rich Text',
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
  styleGroups: [layoutGroup],
};

export default widget;
