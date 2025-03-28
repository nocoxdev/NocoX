import { IconInputSearch } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { allowClear, placeholder, size, variant } from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import SearchInputView from './View';

const widget: WidgetTypeConfig = {
  name: 'input-search',
  view: SearchInputView,
  label: t('Search'),
  icon: IconInputSearch,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  color: (theme) => theme.green6,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        placeholder,
        {
          name: 'defaultValue',
          control: 'input',
          label: t('Default Value'),
        },
        size,

        {
          name: 'enterButton',
          control: 'boolean',
          label: t('Show Search Button'),
          defaultValue: true,
        },

        variant,
        allowClear,
      ],
    },
  ],
  events: [
    {
      name: 'onSearch',
      label: t('Search Event'),
      helpText: t('Search Event'),
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
