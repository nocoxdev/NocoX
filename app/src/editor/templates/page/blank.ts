import { t } from 'i18next';
import { PageType } from '@/types';

export const blank = {
  id: 'blank-page',
  cover: '/template/page/blank.png',
  title: t('Blank Page'),
  description: t('Blank Page'),
  type: PageType.PAGE,
  content: {
    name: 'page',
  },
};
