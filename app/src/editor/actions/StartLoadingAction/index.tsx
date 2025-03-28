import { IconLoader } from '@tabler/icons-react';
import { t } from 'i18next';
import type { ActionConfig } from '../type';
import ConfigView from './ConfigView';

const action: ActionConfig = {
  name: 'startLoading',
  icon: IconLoader,
  type: 'widget',
  label: t('Start loading'),
  callbacks: [],
  configView: ConfigView,
  hidden: (node) =>
    node.page.nodes.every(
      (item) => !item.actions?.find((item) => item.name === 'startLoading'),
    ),
};

export default action;
