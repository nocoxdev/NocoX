import { IconLayoutBottombar } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { layoutGroup } from '../../config/generalStyle';
import FooterView from './View';

const widget: WidgetTypeConfig = {
  name: 'layout-footer',
  view: FooterView,
  label: t('Footer'),
  icon: IconLayoutBottombar,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: false,
  canDrop: true,
  limit: { parent: ['layout'] },
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
