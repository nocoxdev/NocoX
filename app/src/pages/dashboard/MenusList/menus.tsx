import {
  IconApps,
  IconBook2,
  IconDatabase,
  IconLoader,
  IconPhoto,
  IconUserCircle,
  IconUserCog,
} from '@tabler/icons-react';
import { t } from 'i18next';
import AntdIcon from '@/components/AntdIcon';
import type { MergedMenuItemType } from '@/types';

export const menus: MergedMenuItemType[] = [
  { type: 'divider' },
  {
    key: 'apps',
    label: t('Application'),
    type: 'group',
    children: [
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
    ],
  },
  { type: 'divider' },
  {
    key: 'data',
    label: t('Data and Resources'),
    type: 'group',
    children: [
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
      {
        icon: <AntdIcon content={IconPhoto} size={14} />,
        key: 'resource',
        label: t('Resource'),
      },
    ],
  },
  { type: 'divider' },
  {
    key: 'system',
    label: t('System'),
    type: 'group',
    children: [
      {
        icon: <AntdIcon content={IconUserCircle} size={14} />,
        key: 'users',
        label: t('Users'),
      },
      {
        icon: <AntdIcon content={IconUserCog} size={14} />,
        key: 'roles',
        label: t('Roles'),
      },
    ],
  },
];
