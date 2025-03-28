import { t } from 'i18next';
import type { PageTemplateCategoryType } from '@/types';
import { dashboard } from './layout/dashboard';
import { blank } from './page/blank';

export const templates: PageTemplateCategoryType[] = [
  {
    name: 'all',
    label: t('All'),
    items: [blank],
  },
  {
    name: 'layout',
    label: t('Layout'),
    items: [dashboard],
  },
  {
    name: 'form',
    label: t('Form'),
    items: [],
  },
];
