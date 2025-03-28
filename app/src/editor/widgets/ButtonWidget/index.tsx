import { IconClick } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { size } from '../config/generalProps';
import { fillGroup, layoutGroup } from '../config/generalStyle';
import { defaultTemplate } from './defaultTemplate';
import { colorOptions, genVariantOptions } from './options';
import ButtonView from './View';

const widget: WidgetTypeConfig = {
  name: 'button',
  view: ButtonView,
  label: t('Button'),
  icon: IconClick,
  tags: ['button', '按钮', 'btn', '按 钮', 'anniu'],
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,
  canCopy: true,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        size,
        {
          name: 'shape',
          control: 'radio',
          label: t('Shape'),
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              {
                label: t('Default'),
                value: 'default',
              },
              {
                label: t('Circle'),
                value: 'circle',
              },
              { label: t('Round'), value: 'round' },
            ],
          },
        },
        {
          name: 'color',
          control: 'select',
          label: t('Color'),
          defaultValue: 'default',
          controlProps: {
            options: colorOptions,
          },
        },
        {
          name: 'variant',
          control: 'select',
          label: t('Type'),
          controlProps: ({ props }) => {
            const color = props.color;
            return {
              options: genVariantOptions(color),
            };
          },
        },
        {
          name: 'block',
          control: 'switch',
          label: t('Block display'),
          helpText: t('Adjust the button width to its parent width'),
        },
        {
          name: 'ghost',
          control: 'switch',
          label: t('Ghost'),
        },
      ],
    },
  ],
  actions: ['startLoading', 'stopLoading'],
  events: [
    {
      name: 'onClick',
      label: t('Click Event'),
      helpText: t('Click Event'),
    },
  ],
  styleGroups: [layoutGroup, fillGroup],

  defaultTemplate,
};

export default widget;
