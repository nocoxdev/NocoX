import { IconMessage } from '@tabler/icons-react';
import Handlebars from 'handlebars';
import { t } from 'i18next';
import type { ActionConfig } from '../type';
import ConfigView from './ConfigView';

const action: ActionConfig = {
  name: 'showMessage',
  icon: IconMessage,
  type: 'normal',
  label: t('Show message'),
  handler: async ({ node, action = {}, params = {} }) => {
    const { config = {} } = action;
    const { type = 'success', message } = config;

    const template = Handlebars.compile(message);

    node.app.message.show({ type, content: template(params) });
  },

  configView: ConfigView,
};

export default action;
