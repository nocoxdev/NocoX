import { IconMenu } from '@tabler/icons-react';
import { t } from 'i18next';
import { toAntdIcon } from '@/components/AntdIcon/utils';
import { PageType, type WidgetTypeConfig } from '@/types';
import MenuItemView from './View';

const widget: WidgetTypeConfig = {
  name: 'menu-item',
  view: MenuItemView,
  label: t('Menu Item'),
  icon: IconMenu,
  showInExplorer: true,
  canDrag: true,
  canDelete: true,
  canCopy: true,
  canDrop: true,
  limit: {
    parent: ['menu', 'menu-item', 'menu-group'],
  },

  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'urlType',
          label: t('Link Type'),
          control: 'radio',
          defaultValue: 'page',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              { label: t('Bind Page'), value: 'page' },
              { label: t('Custom Link'), value: 'url' },
            ],
          },
        },
        {
          name: 'page',
          label: t('Page'),
          control: 'select',
          visible: ({ props }) => props['urlType'] === 'page',
          controlProps: ({ app }) => {
            return {
              options: app.pages
                .filter((item) => item.type !== PageType.LAYOUT)
                ?.filter((item) => !item.parentId)
                .map((page) => {
                  if (page.type === PageType.GROUP) {
                    return {
                      label: page.title,
                      options: app.pages
                        .filter((item) => item.type !== PageType.LAYOUT)
                        .filter(
                          (item) =>
                            item.parentId === page.id &&
                            item.type === PageType.PAGE,
                        )
                        .map((page) => {
                          const path = `/${app.id}${page.path === '/' ? '' : page.path}`;
                          return {
                            label: page.title,
                            value: path,
                          };
                        }),
                    };
                  } else {
                    return {
                      label: page.title,
                      value: `/${app.id}${page.path === '/' ? '' : page.path}`,
                    };
                  }
                }),
            };
          },
        },
        {
          name: 'url',
          label: t('Link'),
          control: 'input',
          visible: ({ props }) => props['urlType'] === 'url',
        },
        {
          name: 'label',
          label: t('Title'),
          control: 'input',
          defaultValue: t('Menu Item'),
        },
        // {
        //   name: 'key',
        //   label: 'key',
        //   control: 'input',
        // },
        {
          name: 'title',
          helpText: t('Set the hover title when collapsed'),
          label: t('Hover Tip'),
          control: 'input',
        },
        {
          name: 'icon',
          label: t('Icon'),
          control: 'icon',
          controlProps: {
            useColor: false,
            useSize: false,
          },
          computed: {
            default: ({ prop }) => {
              const icon = prop.value;
              if (!icon) return {};
              return { icon: toAntdIcon(icon) };
            },
          },
        },
      ],
    },
  ],
};

export default widget;
