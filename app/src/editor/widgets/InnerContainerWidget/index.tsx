import { IconContainer } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import FlexWidget from '../FlexWidget';
import InnerContainerView from './View';

const widget: WidgetTypeConfig = {
  name: 'inner-container',
  view: InnerContainerView,
  label: t('Container'),
  icon: IconContainer,
  showInExplorer: false,
  canDrag: false,
  canDrop: true,
  canDelete: false,
  canCopy: false,
  showToolbar: true,
  color: (theme) => theme.colorTextTertiary,
  propGroups: FlexWidget.propGroups,
  styleGroups: FlexWidget.styleGroups,
};

export default widget;
