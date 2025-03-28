import { Icon123 } from '@tabler/icons-react';
import { t } from 'i18next';
import { toAntdIcon } from '@/components/AntdIcon/utils';
import type { WidgetTypeConfig } from '@/types';
import {
  defaultValue,
  max,
  min,
  placeholder,
  readOnly,
  size,
  variant,
} from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import NumberView from './View';

const widget: WidgetTypeConfig = {
  name: 'number',
  view: NumberView,
  label: t('Number'),
  icon: Icon123,
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
          control: 'number',
          computed: {
            edit: ({ prop }) => {
              return { value: prop.value };
            },
          },
        },
        size,
        {
          name: 'controls',
          control: 'switch',
          label: t('Controls'),
          helpText: t('Whether to show the increase and decrease buttons'),
          defaultValue: true,
        },
        min,
        max,
        variant,
        readOnly,
        {
          name: 'prefix',
          control: 'icon',
          label: t('Prefix Icon'),
          defaultValue: null,
          computed: {
            default: ({ prop }) => {
              const prefixIcon = prop.value;
              if (!prefixIcon) return {};
              return { prefix: toAntdIcon(prefixIcon) };
            },
          },
          controlProps: {
            useSize: false,
          },
        },
        {
          name: 'suffix',
          control: 'icon',
          label: t('Suffix Icon'),
          defaultValue: null,
          computed: {
            default: ({ prop }) => {
              const suffixIcon = prop.value;
              if (!suffixIcon) return {};
              return { suffix: toAntdIcon(suffixIcon) };
            },
          },
          controlProps: {
            useSize: false,
          },
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
