import { IconTextCaption } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import BodyCellDataTextView from './View';

const widget: WidgetTypeConfig = {
  name: 'table-body-cell-data-text',
  view: BodyCellDataTextView,
  label: t('Data Text'),
  icon: IconTextCaption,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: false,
  limit: {
    parent: ['table-body-cell-data-item'],
  },
  propGroups: [],
  styleGroups: [
    {
      name: 'font',
      label: t('Font'),
      children: [
        {
          name: 'color',
          label: t('Color'),
          control: 'color',
          span: 24,
        },
        {
          name: 'fontSize',
          label: t('Size'),
          control: 'fontsize',
          span: 24,
        },
        {
          name: 'fontWeight',
          label: t('Weight'),
          control: 'fontweight',
          span: 24,
        },
        {
          name: 'fontStyle',
          label: t('Style'),
          control: 'fontstyle',
          span: 24,
        },
        {
          name: 'textAlign',
          label: t('Alignment'),
          control: 'textalign',
          span: 24,
          controlProps: {
            buttonStyle: 'solid',
          },
        },
      ],
    },
  ],
};

export default widget;
