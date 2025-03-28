import { IconPassword } from '@tabler/icons-react';
import { t } from 'i18next';
import { toAntdIcon } from '@/components/AntdIcon/utils';
import type { WidgetTypeConfig } from '@/types';
import {
  allowClear,
  disabled,
  placeholder,
  showCount,
  size,
  status,
  variant,
} from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import PasswordView from './View';

const widget: WidgetTypeConfig = {
  name: 'input-password',
  view: PasswordView,
  label: t('Password'),
  icon: IconPassword,
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
          control: 'input',
          label: t('Default Value'),
        },
        {
          name: 'visibilityToggle',
          control: 'boolean',
          label: t('Password Visibility Toggle'),
          defaultValue: true,
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
        showCount,

        // {
        //   name: "maxLength",
        //   control: "number",
        //   label:   t('"Maximum Length"),
        //   helpText:t("Maximum length of text"),
        //   defaultValue: undefined,
        //   controlProps: {
        //     min: 0,
        //   },
        // },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
