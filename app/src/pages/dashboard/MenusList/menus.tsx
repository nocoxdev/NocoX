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
  {
    key: 'data',
    label: t('Data'),
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
    ],
  },
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
      {
        icon: <AntdIcon content={IconPhoto} size={14} />,
        key: 'resource',
        label: t('Resource'),
      },
    ],
  },
];
