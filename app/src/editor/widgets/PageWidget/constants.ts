import {
  IconArrowAutofitWidth,
  IconDeviceDesktop,
  IconDeviceIpadHorizontal,
  IconDeviceMobile,
} from '@tabler/icons-react';
import { t } from 'i18next';
import type { PageSizeConfigOption } from './type';

export const defaultPageSizeOptions: PageSizeConfigOption[] = [
  {
    label: t('Fluid'),
    type: 'fluid',
    icon: IconArrowAutofitWidth,
  },
  {
    label: t('PC'),
    type: 'pc',
    icon: IconDeviceDesktop,
  },
  {
    label: t('Tablet'),
    type: 'tablet',
    icon: IconDeviceIpadHorizontal,
  },
  {
    label: t('Mobile'),
    type: 'mobile',
    icon: IconDeviceMobile,
  },
];
