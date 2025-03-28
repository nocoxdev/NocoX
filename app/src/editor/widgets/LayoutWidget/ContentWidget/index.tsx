import { IconSection } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { layoutGroup } from '../../config/generalStyle';
import ContentView from './View';

const widget: WidgetTypeConfig = {
  name: 'layout-content',
  view: ContentView,
  label: t('Content'),
  icon: IconSection,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: false,
  canDrop: false,
  limit: { parent: ['layout'] },
  // propGroups: [
  //   {
  //     name: 'general',
  //     label: t('General'),
  //     description: t('General'),
  //     children: [
  //       {
  //         name: 'width',
  //         label: t('Width'),
  //         control: 'size',
  //         defaultValue: '600px',
  //         controlProps: {
  //           width: 120,
  //         },
  //       },
  //     ],
  //   },
  // ],
  styleGroups: [layoutGroup],
};

export default widget;
