import { IconSpacingHorizontal } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { size } from '../config/generalProps';
import SpaceView from './View';

const widget: WidgetTypeConfig = {
  name: 'space',
  view: SpaceView,
  label: t('Space'),
  icon: IconSpacingHorizontal,
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,
  canCopy: true,
  color: (theme) => theme.purple5,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        size,
        {
          name: 'direction',
          control: 'radio',
          label: t('Direction'),
          defaultValue: 'horizontal',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Horizontal'), value: 'horizontal' },
              { label: t('Vertical'), value: 'vertical' },
            ],
          },
        },
        {
          name: 'block',
          control: 'boolean',
          label: t('Block'),
          helpText: t('Adjust the width to the width of the parent element'),
          defaultValue: false,
        },
      ],
    },
  ],
  styleGroups: [],
};

export default widget;
