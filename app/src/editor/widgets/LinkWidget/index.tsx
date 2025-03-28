import { IconLink } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import LinkView from './View';

const widget: WidgetTypeConfig = {
  name: 'link',
  view: LinkView,
  label: t('Link'),
  icon: IconLink,
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,

  canCopy: true,
  color: (theme) => theme.green6,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'href',
          control: 'input',
          label: t('Link'),
        },
        {
          name: 'target',
          control: 'radio',
          label: t('Open Mode'),
          defaultValue: '_self',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Current Window'), value: '_self' },
              { label: t('New Window'), value: '_blank' },
            ],
          },
        },
      ],
    },
  ],
};

export default widget;
