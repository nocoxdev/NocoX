import { IconPhotoUp } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { layoutGroup } from '../config/generalStyle';
import ImageUploadView from './View';

const widget: WidgetTypeConfig = {
  name: 'image-upload',
  view: ImageUploadView,
  label: t('Upload'),
  icon: IconPhotoUp,
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
        {
          name: 'title',
          control: 'input',
          label: t('Title'),
          defaultValue: t('Click Upload'),
        },
      ],
    },
  ],
  styleGroups: [layoutGroup],
};

export default widget;
