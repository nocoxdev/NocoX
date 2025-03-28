import { IconLink } from '@tabler/icons-react';
import { t } from 'i18next';
import type { ActionConfig } from '../type';
import ConfigView from './ConfigView';

const action: ActionConfig = {
  name: 'navigate',
  icon: IconLink,
  label: t('Navigate to'),
  type: 'normal',
  handler: async () => {},
  configView: ConfigView,
};

export default action;
