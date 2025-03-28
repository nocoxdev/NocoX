import { IconBlockquote } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { size } from '../config/generalProps';
import RichTextAreaView from './View';

const widget: WidgetTypeConfig = {
  name: 'rich-textarea',
  view: RichTextAreaView,
  label: t('Rich Input'),
  icon: IconBlockquote,
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
        {
          name: 'defaultValue',
          label: t('Default Text'),
          control: ({ props }) => {
            const type = props.type;
            return type === 'single' ? 'rich-input' : 'rich-text';
          },
          defaultValue: 'Hello World',
        },
      ],
    },
  ],
  styleGroups: [],
};

export default widget;
