import { IconContainer } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import ContainerView from './View';

const widget: WidgetTypeConfig = {
  name: 'container',
  view: ContainerView,
  label: t('Container'),
  icon: IconContainer,
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,
  canCopy: true,
  showToolbar: true,
  color: (theme) => theme.purple5,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'width',
          label: t('Width'),
          control: 'size',
          defaultValue: 'auto',
        },
        {
          name: 'height',
          label: t('Height'),
          control: 'size',
          defaultValue: 'auto',
        },
        // {
        //   name: "horizontalCenter",
        //   label: "水平居中",
        //   control: "boolean",
        //   defaultValue: false,
        // },
        // {
        //   name: "verticalCenter",
        //   label: "垂直居中",
        //   control: "boolean",
        //   defaultValue: false,
        // },
      ],
    },
  ],
  styleGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'background',
          label: t('Background'),
          control: 'background',
          defaultValue: { type: 'none', value: '' },
        },
        {
          name: 'border',
          label: t('Border'),
          control: 'border',
          defaultValue: { borderRadius: 0 },
        },
        {
          name: 'corner',
          label: t('Corner'),
          control: 'corner',
        },
        {
          name: 'shadow',
          label: t('Shadow'),
          control: 'shadow',
        },
      ],
    },
  ],
};

export default widget;
