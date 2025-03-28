import { IconCircleDot } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { size } from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import RadiosView from './View';

const widget: WidgetTypeConfig = {
  name: 'radios',
  view: RadiosView,
  label: t('Radios'),
  icon: IconCircleDot,
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
        {
          name: 'defaultValue',
          control: 'select',
          label: t('Default Value'),
          helpText: t('Please set the default value'),
          defaultValue: [],
          controlProps: ({ props }) => {
            const options = props.options?.options || [];
            return { options };
          },
          computed: {
            edit: ({ prop }) => {
              return { value: prop.value };
            },
          },
        },
        {
          name: 'optionType',
          control: 'radio',
          label: t('Option Style'),
          defaultValue: 'default',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Default'), value: 'default' },
              { label: t('Button'), value: 'button' },
            ],
          },
        },
        {
          ...size,
          visible: ({ props }) => props.optionType === 'button',
        },
        {
          name: 'buttonStyle',
          control: 'radio',
          label: t('Button Type'),
          defaultValue: 'outline',
          visible: ({ props }) => props.optionType === 'button',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Outline'), value: 'outline' },
              { label: t('Solid'), value: 'solid' },
            ],
          },
        },
        {
          name: 'options',
          control: 'options',
          label: t('Options'),
          helpText: t('Please set the options'),
          defaultValue: {
            type: 'custom',
            options: [
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
          },
          // computed: {
          //   default: ({ prop }) => {
          //     const options = (prop.value || []).map((option: any) => ({
          //       ...option,
          //     }));
          //     return { options };
          //   },
          // },
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
