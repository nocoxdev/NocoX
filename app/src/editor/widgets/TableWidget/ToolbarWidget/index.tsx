import { IconContainer } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import FlexWidget from '../../FlexWidget';
import TableToolbarView from './View';

const widget: WidgetTypeConfig = {
  name: 'table-toolbar',
  view: TableToolbarView,
  label: t('Toolbar'),
  icon: IconContainer,
  showInExplorer: false,
  canDrag: false,
  canDrop: true,
  canDelete: false,
  canCopy: false,
  showToolbar: false,
  color: (theme) => theme.colorTextTertiary,
  propGroups: FlexWidget.propGroups,
  styleGroups: FlexWidget.styleGroups,
};

export default widget;
