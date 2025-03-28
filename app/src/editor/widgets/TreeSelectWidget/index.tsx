import { IconListTree } from '@tabler/icons-react';
import { t } from 'i18next';
import { toAntdIcon } from '@/components/AntdIcon/utils';
import type { WidgetTypeConfig } from '@/types';
import { placeholder, size, status, variant } from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import TreeSelectView from './View';

const widget: WidgetTypeConfig = {
  name: 'tree-select',
  view: TreeSelectView,
  label: t('Tree Select'),
  icon: IconListTree,
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
            const options = props.options?.options || [];
            const mode = props.mode || '';
            return { options, mode };
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
          name: 'popupMatchSelectWidth',
          control: 'boolean',
          label: t('Popup Width'),
          helpText: t('Popup width is consistent with the selector'),
          defaultValue: false,
        },
        {
          name: 'treeDefaultExpandAll',
          control: 'boolean',
          label: t('Default Expand All'),
          helpText: t('Default expand all nodes'),
          defaultValue: false,
        },
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
          helpText: t('Max display tag count, default adaptive'),
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
          label: t('Can Search'),
          control: 'boolean',
          defaultValue: false,
        },
        {
          name: 'treeData',
          control: 'tree-options',
          label: t('Options'),
          helpText: t('Please set options'),
          defaultValue: {
            type: 'custom',
            options: [
              {
                label: t('Option 1'),
                value: 'option1',
                children: [
                  {
                    label: t('Sub Option 1'),
                    value: 'option1-1',
                  },
                ],
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
