import { IconCrop11 } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { disabled, size, status, variant } from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import InputOTPView from './View';

const widget: WidgetTypeConfig = {
  name: 'input-otp',
  view: InputOTPView,
  label: t('OTP'),
  icon: IconCrop11,
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
          control: 'input',
          label: t('Default Value'),
        },
        size,
        status,
        variant,
        disabled,
        {
          name: 'length',
          control: 'number',
          label: t('Length'),
          defaultValue: 6,
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
