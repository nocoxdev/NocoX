import { Input, InputNumber } from 'antd';
import { t } from 'i18next';
import type { ValidationOption } from './type';

const validations: ValidationOption[] = [
  {
    name: 'required',
    label: t('Required'),
    defaultValue: {
      required: true,
      message: t('Required field'),
    },
    fields: [
      {
        name: 'message',
        label: t('Error message'),
        component: Input.TextArea,
        required: true,
        props: {
          rows: 3,
        },
      },
    ],
  },
  {
    name: 'len',
    label: t('Length'),
    defaultValue: {
      len: 100,
      message: t('Length is 100'),
    },
    fields: [
      {
        name: 'len',
        label: t('Length'),
        component: Number,
      },
      {
        name: 'message',
        label: t('Error message'),
        component: Input.TextArea,
        required: true,
        props: {
          rows: 3,
        },
      },
    ],
  },
  {
    name: 'min',
    label: t('Min'),
    defaultValue: {
      min: 0,
      message: t('Min length is 0'),
    },
    fields: [
      {
        name: 'min',
        label: t('Min'),
        component: Number,
      },
      {
        name: 'message',
        label: t('Error message'),
        component: Input.TextArea,
        props: {
          rows: 3,
        },
      },
    ],
  },
  {
    name: 'max',
    label: t('Max'),
    defaultValue: {
      max: 100,
      message: t('Max length is 100'),
      type: 'number',
    },
    fields: [
      {
        name: 'max',
        label: t('Max'),
        component: InputNumber,
      },
      {
        name: 'message',
        label: t('Error message'),
        component: Input.TextArea,
        props: {
          rows: 3,
        },
      },
    ],
  },
  {
    name: 'email',
    label: t('Email'),
    defaultValue: {
      pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
      message: t('Please enter a valid email'),
    },
    fields: [
      {
        name: 'pattern',
        label: t('Email'),
        component: Input,
        visible: false,
      },
      {
        name: 'message',
        label: t('Error message'),
        component: Input.TextArea,
        props: {
          rows: 3,
        },
      },
    ],
  },
  {
    name: 'pattern',
    label: t('Custom regular expression'),

    fields: [
      {
        name: 'pattern',
        label: t('Regular expression'),
        component: Input,
      },
      {
        name: 'message',
        label: t('Error message'),
        component: Input.TextArea,
        props: {
          rows: 3,
        },
      },
    ],
  },
];

export default validations;
