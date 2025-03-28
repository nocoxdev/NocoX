import { IconCircleDot } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { size } from '../../config/generalProps';
import RadioView from './View';

const widget: WidgetTypeConfig = {
  name: 'radio',
  view: RadioView,
  label: t('Radio'),
  icon: IconCircleDot,
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
      children: [size],
    },
  ],
  styleGroups: [],
};

export default widget;
