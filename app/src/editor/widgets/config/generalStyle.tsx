import { t } from 'i18next';
import type { WidgetStyleGroupConfig } from '@/types';

export const fontGroup: WidgetStyleGroupConfig = {
  name: 'font',
  label: t('Font'),

  children: [
    {
      name: 'color',
      label: t('Color'),
      control: 'color',
      span: 12,
    },
    {
      name: 'fontSize',
      label: t('Font Size'),
      control: 'fontsize',
      span: 12,
    },
    {
      name: 'fontWeight',
      label: t('Weight'),
      control: 'fontweight',
      span: 12,
    },
    {
      name: 'fontStyle',
      label: t('Style'),
      control: 'fontstyle',
      span: 12,
    },
    {
      name: 'textAlign',
      label: t('Alignment'),
      control: 'textalign',
      span: 12,
      controlProps: {
        buttonStyle: 'solid',
      },
    },
  ],
};
export const layoutGroup: WidgetStyleGroupConfig = {
  name: 'layout',
  label: t('Layout'),
  children: [
    {
      name: 'width',
      label: t('Width'),
      control: 'width',
    },
    { name: 'height', label: t('Height'), control: 'height' },
    {
      name: 'border',
      label: t('Border'),
      control: 'border',
    },
    {
      name: 'corner',
      label: t('Corner'),
      control: 'corner',
    },
    {
      name: 'padding',
      label: t('Padding'),
      control: 'padding',
    },
    {
      name: 'margin',
      label: t('Margin'),
      control: 'margin',
    },
  ],
};

export const fillGroup: WidgetStyleGroupConfig = {
  name: 'fill',
  label: t('Fill'),
  description: t('Fill'),
  children: [
    {
      name: 'background',
      label: t('Background'),
      control: 'background',
      defaultValue: { type: 'none', value: '' },
    },

    {
      name: 'shadow',
      label: t('Shadow'),
      control: 'shadow',
    },
  ],
};
