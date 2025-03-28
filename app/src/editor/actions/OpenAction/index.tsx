import { IconArticle } from '@tabler/icons-react';
import { t } from 'i18next';
import type { ActionConfig } from '../type';
import ConfigView from './ConfigView';

const action: ActionConfig = {
  name: 'open',
  icon: IconArticle,
  type: 'widget',
  label: t('Open popup'),
  callbacks: [],
  configView: ConfigView,
  hidden: (node) =>
    node.page.nodes.every(
      (item) => !item.actions?.find((item) => item.name === 'open'),
    ),
};

export default action;
