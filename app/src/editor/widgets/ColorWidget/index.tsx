import { IconPalette } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { size } from '../config/generalProps';
import ColorView from './View';

const widget: WidgetTypeConfig = {
  name: 'color',
  view: ColorView,
  label: t('Color'),
  icon: IconPalette,
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
          label: t('Default Value'),
          control: 'color',
        },
      ],
    },
  ],
  styleGroups: [],
};

export default widget;
