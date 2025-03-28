import { t } from 'i18next';
import General from './General';
import VisitControl from './VisitControl';

export const settingItems = [
  {
    name: 'general',
    label: t('General'),
    content: <General style={{ padding: 24 }} />,
  },
  {
    name: 'users',
    label: t('Users'),
    content: <VisitControl />,
  },
];
