import { IconLayoutGrid } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import RowView from './View';

const widget: WidgetTypeConfig = {
  name: 'row',
  view: RowView,
  label: t('Grid'),
  icon: IconLayoutGrid,
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
          name: 'justify',
          control: 'radio',
          label: t('Horizontal Alignment'),
          defaultValue: 'start',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Left'), value: 'start' },
              { label: t('Center'), value: 'center' },
              { label: t('Right'), value: 'end' },
            ],
          },
        },
        {
          name: 'align',
          control: 'radio',
          label: t('Vertical Alignment'),
          defaultValue: 'top',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Top'), value: 'top' },
              { label: t('Center'), value: 'middle' },
              { label: t('Bottom'), value: 'bottom' },
              { label: t('Stretch'), value: 'stretch' },
            ],
          },
        },

        {
          name: 'horizontalGutter',
          control: 'number',
          label: t('Horizontal Spacing'),
          controlProps: {
            min: 0,
          },
        },
        {
          name: 'verticalGutter',
          control: 'number',
          label: t('Vertical Spacing'),
          controlProps: {
            min: 0,
          },
        },

        {
          name: 'wrap',
          control: 'boolean',
          label: t('Whether to wrap'),
        },
        {
          name: 'children',
          label: t('Column'),
          assist: true,
          controlProps: {
            label: (_: Record<string, any>, index: number) =>
              t('Column') + (index + 1),
            add: () => ({
              name: 'col',
              props: { span: 6, offset: 0 },
            }),
          },
        },
      ],
    },
  ],
  defaultTemplate: {
    name: 'row',
    elements: {
      children: [
        { name: 'col', props: { span: 6, offset: 0 } },
        { name: 'col', props: { span: 6, offset: 0 } },
        { name: 'col', props: { span: 6, offset: 0 } },
      ],
    },
  },

  styleGroups: [],
};

export default widget;
