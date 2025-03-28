import { IconLayoutDistributeVertical } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { fillGroup } from '../config/generalStyle';
import { alignOptions, justifyOptions } from './options';
import FlexView from './View';

const widget: WidgetTypeConfig = {
  name: 'flex',
  view: FlexView,
  label: t('Flex'),
  icon: IconLayoutDistributeVertical,
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
        {
          name: 'direction',
          control: 'radio',
          label: t('Direction'),
          helpText: t(
            'When set to horizontal layout, the vertical alignment will become horizontal alignment, and vice versa',
          ),
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
          name: 'align',
          control: 'select',
          label: t('Vertical Alignment'),
          controlProps: {
            options: alignOptions,
          },
        },
        {
          name: 'justify',
          control: 'select',
          label: t('Horizontal Alignment'),
          controlProps: {
            options: justifyOptions,
          },
        },
        {
          name: 'gap',
          control: 'number',
          label: t('Gap'),
          helpText: t('Set the gap between grids'),
          defaultValue: 8,
          controlProps: {
            min: 0,
            max: 100,
            step: 1,
          },
        },
        {
          name: 'wrap',
          control: 'boolean',
          label: t('Wrap'),
          computed: {
            default: ({ prop }) => {
              return { wrap: prop.value ? 'wrap' : 'nowrap' };
            },
          },
        },
        {
          name: 'flexGrow',
          control: 'boolean',
          label: t('Flex Grow'),
          defaultValue: true,
        },
        {
          name: 'flexShrink',
          control: 'boolean',
          label: t('Flex Shrink'),
          defaultValue: true,
        },
        {
          name: 'emptyText',
          visible: false,
          defaultValue: t('Please drag components here'),
        },
        {
          name: 'emptyStyle',
          visible: false,
        },
      ],
    },
  ],
  styleGroups: [
    {
      name: 'layout',
      label: t('Appearance'),
      children: [
        {
          name: 'width',
          label: t('Width'),
          control: 'width',
          defaultValue: { width: '100%' },
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
    },
    fillGroup,
  ],
};

export default widget;
