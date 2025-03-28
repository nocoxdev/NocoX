import { IconArticle } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { defaultTemplate } from './defaultTemplate';
import ModalView from './View';

const widget: WidgetTypeConfig = {
  name: 'modal',
  view: ModalView,
  label: t('Modal'),
  icon: IconArticle,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: false,
  canDrop: false,
  color: (theme) => theme.orange6,
  limit: { parent: ['page'] },
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'open',
          label: t('Open'),
          control: 'boolean',
          defaultValue: true,
          mode: 'edit',
        },
        {
          name: 'width',
          label: t('Width'),
          control: 'size',
          defaultValue: '600px',
          controlProps: {
            width: 120,
          },
        },
        {
          name: 'maskClosable',
          label: t('Click Mask to Close'),
          control: 'boolean',
          defaultValue: false,
        },
        {
          name: 'destroyOnClose',
          label: t('Destroy on Close'),
          control: 'boolean',
          defaultValue: true,
        },
        {
          name: 'centered',
          label: t('Center'),
          control: 'boolean',
          defaultValue: false,
        },
        {
          name: 'closable',
          label: t('Show Close Button'),
          control: 'boolean',
          defaultValue: true,
        },
        {
          name: 'mask',
          label: t('Show Mask'),
          control: 'boolean',
          defaultValue: true,
        },
      ],
    },
  ],
  styleGroups: [],
  actions: ['open', 'close'],
  defaultTemplate,
};

export default widget;
