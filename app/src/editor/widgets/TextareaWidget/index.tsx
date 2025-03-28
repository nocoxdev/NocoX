import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import {
  defaultValue,
  placeholder,
  showCount,
  variant,
} from '../config/generalProps';
import { layoutGroup } from '../config/generalStyle';
import Icon from './Icon';
import TextareaView from './View';

const widget: WidgetTypeConfig = {
  name: 'textarea',
  view: TextareaView,
  label: t('Textarea'),
  icon: Icon,
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
          ...defaultValue,
          control: 'textarea',
          computed: {
            edit: ({ prop }) => {
              return { value: prop.value };
            },
          },
        },
        {
          name: 'rows',
          label: t('Rows'),
          control: 'number',
          defaultValue: 3,
          controlProps: {
            min: 1,
            max: 100,
          },
        },
        variant,
        showCount,
        {
          name: 'maxLength',
          control: 'number',
          label: t('Max Length'),
          helpText: t('Max length of text'),
          defaultValue: undefined,
          controlProps: {
            min: 0,
          },
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
