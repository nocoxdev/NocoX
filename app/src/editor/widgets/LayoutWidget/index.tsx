import {
  IconLayoutNavbar,
  IconLayoutSidebar,
  IconTableDashed,
} from '@tabler/icons-react';
import { t } from 'i18next';
import AntdIcon from '@/components/AntdIcon';
import type { WidgetTypeConfig } from '@/types';
import { fillGroup, layoutGroup } from '../config/generalStyle';
import LayoutView from './View';

const widget: WidgetTypeConfig = {
  name: 'layout',
  view: LayoutView,
  label: t('Layout'),
  icon: IconTableDashed,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: false,
  canDrop: true,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'type',
          label: t('Layout Type'),
          control: 'radio',
          controlProps: {
            optionType: 'button',
            options: [
              {
                label: <AntdIcon content={IconLayoutSidebar} />,
                value: 'horizontal',
              },
              {
                label: <AntdIcon content={IconLayoutNavbar} />,
                value: 'vertical',
              },
            ],
          },
        },
      ],
    },
  ],
  styleGroups: [layoutGroup, fillGroup],
  // defaultTemplate,
};

export default widget;
