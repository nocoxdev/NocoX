import { IconSeparator } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { layoutGroup } from '../config/generalStyle';
import DividerView from './View';

const widget: WidgetTypeConfig = {
  name: 'divider',
  view: DividerView,
  label: t('Divider'),
  icon: IconSeparator,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'children',
          control: 'input',
          label: t('Nested Title'),
          defaultValue: t('Divider'),
        },
        {
          name: 'type',
          control: 'radio',
          label: t('Type'),
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
          name: 'color',
          control: 'color',
          label: t('Color'),
          helpText: t('Divider Color'),
        },
        {
          name: 'height',
          control: 'number',
          label: t('Height'),
          defaultValue: 24,
          visible: ({ props }) => props.type === 'vertical',
        },
        {
          name: 'margin',
          control: 'number',
          label: t('Margin'),
          defaultValue: 4,
          visible: ({ props }) => props.type === 'vertical',
        },

        {
          name: 'orientation',
          control: 'radio',
          label: t('Title Position'),
          defaultValue: 'center',
          visible: ({ props }) => props.type === 'horizontal',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Left'), value: 'left' },
              { label: t('Center'), value: 'center' },
              { label: t('Right'), value: 'right' },
            ],
          },
        },
        {
          name: 'plain',
          control: 'boolean',
          label: t('Plain Text Style'),
          helpText: t('Whether the text is displayed as a plain text style'),
          defaultValue: false,
          visible: ({ props }) => props.type === 'horizontal',
        },
        {
          name: 'variant',
          control: 'radio',
          label: t('Dashed Line'),
          defaultValue: 'solid',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Solid'), value: 'solid' },
              { label: t('Dashed'), value: 'dashed' },
              { label: t('Dotted'), value: 'dotted' },
            ],
          },
          visible: ({ props }) => props.type === 'horizontal',
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
