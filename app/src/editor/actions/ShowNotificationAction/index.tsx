import { IconBellRinging } from '@tabler/icons-react';
import { t } from 'i18next';
import type { ActionConfig } from '../type';
import ConfigView from './ConfigView';

const action: ActionConfig = {
  name: 'showNotification',
  icon: IconBellRinging,
  type: 'normal',
  label: t('Show notification'),
  handler: async ({ node, action = {} }) => {
    const { config = {} } = action;
    const { type = 'success', notification } = config;
    node.app.notification.show({ type, content: notification });
  },

  configView: ConfigView,
};

export default action;
