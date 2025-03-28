import { IconClock } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import {
  allowClear,
  defaultValue,
  placeholder,
  size,
  status,
  variant,
} from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import TimePickerView from './View';

const widget: WidgetTypeConfig = {
  name: 'time',
  view: TimePickerView,
  label: t('Time'),
  icon: IconClock,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  color: (theme) => theme.green6,
  propGroups: [
    {
      name: 'general',
      label: '通用',
      description: '通用',
      children: [
        placeholder,
        {
          ...defaultValue,
          control: 'time',
          controlProps: ({ props }) => {
            const format = props.format;
            return {
              format,
            };
          },
          computed: {
            edit: ({ prop }) => {
              return { value: prop.value };
            },
          },
        },
        size,
        status,
        {
          name: 'format',
          control: 'select',
          label: t('Time Format'),
          helpText: t('Please select the display format'),
          defaultValue: 'HH:mm:ss',
          controlProps: {
            options: [
              { label: 'HH:mm:ss', value: 'HH:mm:ss' },
              {
                label: 'h:mm:ss A',
                value: 'h:mm:ss A',
              },
              {
                label: 'h:mm A',
                value: 'h:mm A',
              },
            ],
          },
        },
        variant,
        allowClear,
        {
          name: 'use12Hours',
          label: t('12-hour'),
          defaultValue: false,
          control: 'boolean',
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
