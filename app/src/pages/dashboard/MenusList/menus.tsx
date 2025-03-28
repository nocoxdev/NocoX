import {
  IconApps,
  IconBook2,
  IconDatabase,
  IconLoader,
} from '@tabler/icons-react';
import { t } from 'i18next';
import AntdIcon from '@/components/AntdIcon';
import type { MergedMenuItemType } from '@/types';

export const menus: MergedMenuItemType[] = [
  {
    icon: <AntdIcon content={IconApps} />,
    key: 'my-apps',
    label: t('My apps'),
  },
  {
    icon: <AntdIcon content={IconLoader} />,
    key: 'releases',
    label: t('Releases'),
  },
  {
    icon: <AntdIcon content={IconDatabase} />,
    key: 'database',
    label: t('Database'),
  },
  {
    icon: <AntdIcon content={IconBook2} />,
    key: 'dictionary',
    label: t('Dictionary'),
  },
];
