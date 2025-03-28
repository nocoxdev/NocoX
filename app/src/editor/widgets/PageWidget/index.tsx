import { IconFileText } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import { fillGroup } from '../config/generalStyle';
import PageView from './View';

const widget: WidgetTypeConfig = {
  name: 'page',
  view: PageView,
  label: t('Page'),
  showInExplorer: false,
  icon: IconFileText,
  canDrag: false,
  canDrop: true,
  canDelete: false,
  canCopy: false,
  showToolbar: true,
  showToolbarMore: false,
  color: (theme) => theme.purple6,
  // propGroups: [
  //   {
  //     name: 'general',
  //     label: t('General'),
  //     description: t('General'),
  //     children: [
  //       {
  //         name: 'size',
  //         label: t('Page Size'),
  //         control: 'segmented',
  //         controlProps: {
  //           block: true,
  //           size: 'small',
  //           options: defaultPageSizeOptions.map((item) => ({
  //             value: item.type,
  //             icon: (
  //               <Tooltip title={item.label}>
  //                 <Fragment>
  //                   <AntdIcon content={item.icon} />
  //                 </Fragment>
  //               </Tooltip>
  //             ),
  //           })),
  //         },
  //       },
  //     ],
  //   },
  // ],
  styleGroups: [
    {
      name: 'layout',
      label: t('Layout'),
      children: [
        {
          name: 'width',
          label: t('Width'),
          control: 'width',
          defaultValue: { width: '100%' },
        },
        {
          name: 'height',
          label: t('Height'),
          control: 'height',
          defaultValue: { height: 400 },
        },
        {
          name: 'border',
          label: t('Border'),
          control: 'border',
        },
        {
          name: 'corner',
          label: t('Corner'),
          control: 'corner',
        },
        {
          name: 'padding',
          label: t('Padding'),
          control: 'padding',
          defaultValue: { padding: 24 },
        },
        {
          name: 'margin',
          label: t('Margin'),
          control: 'margin',
        },
      ],
    },
    fillGroup,
  ],
};

export default widget;
