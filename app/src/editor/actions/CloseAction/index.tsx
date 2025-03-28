import { IconBrowserX } from '@tabler/icons-react';
import { t } from 'i18next';
import type { ActionConfig } from '../type';
import ConfigView from './ConfigView';

const action: ActionConfig = {
  name: 'close',
  icon: IconBrowserX,
  type: 'widget',
  label: t('Close popup'),
  configView: ConfigView,
  hidden: (node) =>
    node.page.nodes.every(
      (item) => !item.actions?.find((item) => item.name === 'close'),
    ),
};

export default action;
