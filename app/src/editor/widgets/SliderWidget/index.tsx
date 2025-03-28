import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { max, min } from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import SliderView from './View';

const widget: WidgetTypeConfig = {
  name: 'slider',
  view: SliderView,
  label: t('Slider'),
  icon: IconAdjustmentsHorizontal,
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
        min,
        max,
        {
          name: 'vertical',
          control: 'boolean',
          label: t('Vertical Mode'),
          defaultValue: false,
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
