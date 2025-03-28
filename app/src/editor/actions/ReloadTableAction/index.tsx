import { IconReload } from '@tabler/icons-react';
import { t } from 'i18next';
import type { ActionConfig } from '../type';
import ConfigView from './ConfigView';

const action: ActionConfig = {
  name: 'reload',
  icon: IconReload,
  type: 'widget',
  label: t('Reload table'),
  callbacks: [],
  configView: ConfigView,
  hidden: (node) =>
    node.page.nodes.every(
      (item) => !item.actions?.find((item) => item.name === 'reload'),
    ),
};

export default action;
