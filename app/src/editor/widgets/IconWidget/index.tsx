import { IconMoodSmile } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { color } from '../config/generalProps';
import IconView from './View';

const widget: WidgetTypeConfig = {
  name: 'icon',
  view: IconView,
  label: t('Icon'),
  icon: IconMoodSmile,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'value',
          control: 'icon',
          label: t('Icon'),
          defaultValue: { name: 'mood-smile-outline' },
          controlProps: {
            useColor: false,
            useSize: false,
            placement: 'left',
          },
        },
        color,
        {
          name: 'size',
          label: t('Icon Size'),
          control: 'size',
          defaultValue: '1em',
        },
        {
          name: 'stroke',
          label: t('Stroke Width'),
          control: 'number',
          defaultValue: 1,
          controlProps: {
            min: 0.25,
            step: 0.25,
            max: 10,
          },
        },
      ],
    },
  ],
  styleGroups: [],
  canDelete: true,
  canCopy: true,
};

export default widget;
