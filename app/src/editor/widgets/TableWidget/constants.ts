import { t } from 'i18next';
import type { ValueLabel } from '@/types';

export const columnTypes: ValueLabel<string>[] = [
  { value: 'custom', label: t('Custom') },
  { value: 'index', label: t('Index') },
  { value: 'indexBorder', label: t('Index Border') },
  { value: 'password', label: t('Password Input') },
  { value: 'money', label: t('Money Input') },
  { value: 'textarea', label: t('Textarea') },
  { value: 'date', label: t('Date') },
  { value: 'dateTime', label: t('Date Time') },
  { value: 'dateWeek', label: t('Date Week') },
  { value: 'dateMonth', label: t('Date Month') },
  { value: 'dateQuarter', label: t('Date Quarter') },
  { value: 'dateYear', label: t('Date Year') },
  { value: 'dateRange', label: t('Date Range') },
  { value: 'dateTimeRange', label: t('Date Time Range') },
  { value: 'time', label: t('Time') },
  { value: 'timeRange', label: t('Time Range') },
  { value: 'text', label: t('Text') },
  { value: 'select', label: t('Select') },
  { value: 'treeSelect', label: t('Tree Select') },
  { value: 'checkbox', label: t('Checkbox') },
  { value: 'rate', label: t('Rate') },
  { value: 'radio', label: t('Radio') },
  { value: 'radioButton', label: t('Radio Button') },
  { value: 'progress', label: t('Progress') },
  { value: 'percent', label: t('Percent') },
  { value: 'digit', label: t('Digit') },
  { value: 'second', label: t('Second') },
  { value: 'avatar', label: t('Avatar') },
  { value: 'code', label: t('Code') },
  { value: 'switch', label: t('Switch') },
  { value: 'fromNow', label: t('From Now') },
  { value: 'image', label: t('Image') },
  { value: 'jsonCode', label: t('Json Code') },
  { value: 'color', label: t('Color') },
  { value: 'cascader', label: t('Cascader') },
];

export const indexField = { value: 'index', label: t('Index') };

export const actionsField = { value: 'actions', label: t('Actions') };

export const defaultSampleData = [
  {
    id: '1',
  },
];
