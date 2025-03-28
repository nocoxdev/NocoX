import { t } from 'i18next';

export const defaultTemplate = {
  name: 'layout',
  elements: {
    children: [
      {
        name: 'layout-sider',
        label: t('Sider'),
        props: {
          mode: 'inline',
        },
        elements: {
          children: [
            {
              name: 'menu',
              label: t('Menu'),
              elements: {
                children: [
                  {
                    name: 'menu-item',
                    props: {
                      label: t('Menu Item'),
                      key: '1',
                    },
                    elements: {
                      children: [
                        {
                          name: 'menu-item',
                          props: {
                            label: t('Menu Item'),
                            key: '11',
                          },
                        },
                        {
                          name: 'menu-item',
                          props: {
                            label: t('Menu Item'),
                            key: '22',
                          },
                        },
                      ],
                    },
                  },
                  {
                    name: 'menu-item',
                    props: {
                      label: t('Menu Item'),
                      key: '2',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: 'layout',
        elements: {
          children: [
            {
              name: 'layout-header',
              label: t('Header'),
            },
            {
              name: 'layout-content',
              label: t('Content'),
            },
            {
              name: 'layout-footer',
              label: t('Footer'),
            },
          ],
        },
      },
    ],
  },
};
