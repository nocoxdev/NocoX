import { IconSelect } from '@tabler/icons-react';
import { t } from 'i18next';
import { toAntdIcon } from '@/components/AntdIcon/utils';
import type { WidgetTypeConfig } from '@/types';
import { placeholder, size, status, variant } from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import SelectView from './View';

const widget: WidgetTypeConfig = {
  name: 'select',
  view: SelectView,
  label: t('Select'),
  icon: IconSelect,
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
          name: 'defaultValue',
          control: 'select',
          label: t('Default Value'),
          controlProps: ({ props }) => {
            return { options: props.options, mode: props.mode };
          },
          computed: {
            edit: ({ prop }) => {
              return { value: prop.value };
            },
          },
        },
        variant,
        size,
        status,
        {
          name: 'mode',
          control: 'radio',
          label: t('Mode'),
          defaultValue: '',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Default'), value: '' },
              { label: t('Multiple'), value: 'multiple' },
              { label: t('Tags'), value: 'tags' },
            ],
          },
        },
        {
          name: 'maxTagCount',
          control: 'number',
          label: t('Tag Count'),
          helpText: t(
            'The maximum number of tags to display, default is adaptive',
          ),
          defaultValue: 1,
          visible: ({ props }) => {
            const mode = props.mode;
            return mode === 'tags' || mode === 'multiple';
          },
          controlProps: ({ props }) => {
            const options = props.options || [];
            return { min: 0, max: options.length };
          },
        },
        {
          name: 'suffixIcon',
          control: 'icon',
          label: t('Suffix Icon'),
          controlProps: {
            useSize: true,
            useColor: true,
          },
          computed: {
            default: ({ prop }) => {
              const suffixIcon = prop.value;
              if (!suffixIcon) return {};
              return { suffixIcon: toAntdIcon(suffixIcon) };
            },
          },
        },
        {
          name: 'showSearch',
          label: t('Show Search'),
          control: 'boolean',
          defaultValue: false,
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
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
