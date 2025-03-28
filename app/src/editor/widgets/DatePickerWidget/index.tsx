import { IconCalendar } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import {
  allowClear,
  defaultValue,
  disabled,
  placeholder,
  size,
  variant,
} from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import DatePickerView from './View';

const widget: WidgetTypeConfig = {
  name: 'date',
  view: DatePickerView,
  label: t('Date'),
  icon: IconCalendar,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  color: (theme) => theme.green6,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        placeholder,
        {
          ...defaultValue,
          control: 'date',
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
        {
          name: 'format',
          control: 'select',
          label: t('Format'),
          helpText: t('Please select the display format'),
          defaultValue: 'YYYY-MM-DD HH:mm:ss',
          controlProps: {
            options: [
              { label: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
              { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
              { label: 'YYYY/MM-DD HH:mm:ss', value: 'YYYY/MM/DD HH:mm:ss' },
              { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
              { label: 'HH:mm:ss', value: 'HH:mm:ss' },
              {
                label: 'ddd, MMM D, YYYY h:mm A',
                value: 'ddd, MMM D, YYYY h:mm A',
              },
              {
                label: 'h:mm A',
                value: 'h:mm A',
              },
              {
                label: 'MM/DD/YYYY',
                value: 'MM/DD/YYYY',
              },
              {
                label: 'MMMM D, YYYY',
                value: 'MMMM D, YYYY',
              },
              {
                label: 'MMMM D, YYYY h:mm A',
                value: 'MMMM D, YYYY h:mm A',
              },
              {
                label: 'dddd, MMMM D, YYYY h:mm A',
                value: 'dddd, MMMM D, YYYY h:mm A',
              },
              {
                label: 'MMM D, YYYY',
                value: 'MMM D, YYYY',
              },
              {
                label: 'MMM D, YYYY h:mm A',
                value: 'MMM D, YYYY h:mm A',
              },
              {
                label: 'M/D/YYYY',
                value: 'M/D/YYYY',
              },
            ],
          },
        },
        size,
        allowClear,
        disabled,
        variant,
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
