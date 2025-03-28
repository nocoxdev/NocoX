import { IconLetterCase } from '@tabler/icons-react';
import { t } from 'i18next';
import { toAntdIcon } from '@/components/AntdIcon/utils';
import type { WidgetTypeConfig } from '@/types';
import {
  allowClear,
  disabled,
  placeholder,
  readOnly,
  showCount,
  size,
  status,
  variant,
} from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import InputView from './View';

const widget: WidgetTypeConfig = {
  name: 'input',
  view: InputView,
  label: t('Input'),
  icon: IconLetterCase,
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
          control: 'code-editor',
          label: t('Default Value'),
        },
        size,
        status,
        {
          name: 'prefix',
          control: 'icon',
          label: t('Prefix Icon'),
          controlProps: {
            useSize: true,
            useColor: true,
          },
          computed: {
            default: ({ prop }) => {
              const prefixIcon = prop.value;
              if (!prefixIcon) return {};
              return { prefix: toAntdIcon(prefixIcon) };
            },
          },
        },
        {
          name: 'suffix',
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
              return { suffix: toAntdIcon(suffixIcon) };
            },
          },
        },

        variant,
        allowClear,
        disabled,
        readOnly,
        showCount,
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
