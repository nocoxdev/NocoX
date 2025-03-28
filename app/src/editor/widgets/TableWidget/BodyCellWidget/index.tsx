import { IconTableColumn } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { layoutGroup } from '../../config/generalStyle';
import BodyCellView from './View';

const widget: WidgetTypeConfig = {
  name: 'table-body-cell',
  view: BodyCellView,
  label: t('Cell'),
  icon: IconTableColumn,
  showInExplorer: false,
  canDrag: false,
  canDrop: true,
  canDelete: false,
  canCopy: false,
  showToolbar: false,
  color: (theme) => theme.colorTextTertiary,
  styleGroups: [layoutGroup],
};

export default widget;
