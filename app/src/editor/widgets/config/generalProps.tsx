import { t } from 'i18next';
import type { WidgetPropConfig } from '@/types';

export const bordered: WidgetPropConfig = {
  name: 'bordered',
  control: 'switch',
  label: t('Border'),
  helpText: t('Whether to display the border'),
  defaultValue: true,
};
export const readOnly: WidgetPropConfig = {
  name: 'readOnly',
  control: 'switch',
  label: t('Read Only'),
  helpText: t('Whether to be read-only'),
};

export const variant: WidgetPropConfig = {
  name: 'variant',
  control: 'radio',
  label: t('Variant'),
  defaultValue: 'outlined',
  controlProps: {
    optionType: 'button',
    buttonStyle: 'solid',
    options: [
      { label: t('Outlined'), value: 'outlined' },
      { label: t('Borderless'), value: 'borderless' },
      { label: t('Filled'), value: 'filled' },
    ],
  },
};

export const allowClear: WidgetPropConfig = {
  name: 'allowClear',
  control: 'switch',
  label: t('Allow Clear'),
  helpText: t('Whether to allow clearing content'),
  defaultValue: true,
};

export const disabled: WidgetPropConfig = {
  name: 'disabled',
  control: 'switch',
  label: t('Disabled'),
  helpText: t('Whether to disable'),
  defaultValue: false,
};

export const showCount: WidgetPropConfig = {
  name: 'showCount',
  control: 'switch',
  label: t('Show Count'),
  defaultValue: false,
};

export const placeholder: WidgetPropConfig = {
  name: 'placeholder',
  control: 'input',
  label: t('Placeholder'),
  helpText: t('Please enter a placeholder'),
  defaultValue: '',
};

export const defaultValue: WidgetPropConfig = {
  name: 'defaultValue',
  control: 'input',
  label: t('Default Value'),
};

export const size: WidgetPropConfig = {
  name: 'size',
  control: 'radio',
  label: t('Size'),
  helpText: t('Please set the size'),
  controlProps: {
    optionType: 'button',
    buttonStyle: 'solid',
    options: [
      { label: t('Small'), value: 'small' },
      { label: t('Middle'), value: 'middle' },
      { label: t('Large'), value: 'large' },
    ],
  },
};

export const richText: WidgetPropConfig = {
  name: 'label',
  control: 'rich-text',
  label: t('Content'),
  defaultValue: 'Hello World',
};

export const min: WidgetPropConfig = {
  name: 'min',
  control: 'number',
  label: t('Min'),
  defaultValue: 0,
};

export const max: WidgetPropConfig = {
  name: 'max',
  control: 'number',
  label: t('Max'),
  defaultValue: 100,
};

export const status: WidgetPropConfig = {
  name: 'status',
  control: 'radio',
  label: t('Status'),
  helpText: t('Please set the status'),
  controlProps: {
    optionType: 'button',
    buttonStyle: 'solid',
    options: [
      { label: t('Normal'), value: '' },
      { label: t('Warning'), value: 'warning' },
      { label: t('Error'), value: 'error' },
    ],
  },
};

export const icon: WidgetPropConfig = {
  name: 'icon',
  control: 'icon',
  label: t('Icon'),
  defaultValue: undefined,
};

export const color: WidgetPropConfig = {
  name: 'color',
  control: 'color',
  label: t('Color'),
};

export const options: WidgetPropConfig = {
  name: 'options',
  control: 'options',
  label: t('Options'),
  helpText: t('Please set the options'),
  defaultValue: [
    {
      label: t('Option 1'),
      value: 'option1',
    },
    {
      label: t('Option 2'),
      value: 'option2',
    },
    {
      label: t('Option 3'),
      value: 'option3',
    },
  ],
  computed: {
    default: ({ prop }) => {
      const options = (prop.value || []).map((option: any) => ({
        ...option,
        label: option.label,
      }));
      return { options };
    },
  },
};
