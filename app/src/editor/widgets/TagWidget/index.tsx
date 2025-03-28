import { IconTag } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { bordered } from '../config/generalProps';
import { fontGroup, layoutGroup } from '../config/generalStyle';
import { statusColorOptions } from './options';
import TagView from './View';

const widget: WidgetTypeConfig = {
  name: 'tag',
  view: TagView,
  label: t('Tag'),
  icon: IconTag,
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
        {
          name: 'colorType',
          assist: true,
          control: 'radio',
          label: t('Color Type'),
          helpText: t('Please select the color type'),
          defaultValue: 'default',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Default'), value: 'default' },
              { label: t('Status'), value: 'status' },
            ],
          },
        },
        {
          name: 'colorNormal',
          control: 'color',
          label: t('Color'),
          assist: true,
          visible: ({ props }) => props.colorType !== 'status',
        },
        {
          name: 'colorStatus',
          control: 'select',
          label: t('Status Color'),
          helpText: t('Please set the status color'),
          assist: true,
          visible: ({ props }) => props.colorType === 'status',
          controlProps: {
            options: statusColorOptions,
          },
        },
        {
          name: 'color',
          control: 'color',
          label: t('Color'),
          visible: false,
          computed: {
            default: ({ props }) => {
              const { colorType, colorNormal, colorStatus } = props;
              if (colorType === 'status') {
                return { color: colorStatus };
              } else {
                return { color: colorNormal };
              }
            },
          },
        },
        bordered,
        {
          name: 'closable',
          control: 'boolean',
          label: t('Can Close'),
          defaultValue: false,
        },
      ],
    },
  ],
  styleGroups: [fontGroup, layoutGroup],
  defaultTemplate: {
    name: 'tag',
    elements: {
      children: [{ name: 'simple-text', props: { value: '标签' } }],
    },
  },
};

export default widget;
