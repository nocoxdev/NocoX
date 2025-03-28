import { t } from 'i18next';
import { PageType } from '@/types';

export const dashboard = {
  id: 'dashboard-layout',
  cover: '/template/layout/dashboard.png',
  title: t('Dashboard'),
  description: t('Dashboard'),
  type: PageType.LAYOUT,
  content: {
    name: 'page',
    label: t('Page'),
    visible: true,
    props: {},
    styles: { padding: { padding: 0 }, background: {} },
    events: [],
    elements: {
      children: [
        {
          name: 'layout',
          label: t('Page Layout'),
          visible: true,
          props: {},
          styles: { background: { type: 'none', value: '' } },
          events: [],
          elements: {
            children: [
              {
                name: 'layout-sider',
                label: t('Sider'),
                visible: true,
                props: {
                  width: '200px',
                  theme: 'dark',
                  collapsible: true,
                  collapsedWidth: 60,
                },
                styles: {},
                events: [],
                elements: {
                  children: [
                    {
                      name: 'condition',
                      label: t('Condition'),
                      visible: true,
                      props: {
                        visible: false,
                        filter: {
                          conjunction: 1,
                          conditions: [
                            {
                              key: '3ksvN0JhkWkhoX1xrMOP',
                              name: 'collapsed',
                              value: false,
                              operator: 1,
                            },
                          ],
                        },
                      },
                      styles: {},
                      events: [],
                      elements: {
                        children: [
                          {
                            name: 'flex',
                            label: t('Flex'),
                            visible: true,
                            props: {
                              direction: 'horizontal',
                              gap: 8,
                              flexGrow: true,
                              flexShrink: true,
                              emptyText: '请拖动组件到此处',
                            },
                            styles: {
                              width: { width: '100%' },
                              padding: { paddingLeft: 24 },
                              margin: { marginBottom: 12 },
                              background: {},
                            },
                            events: [],
                            elements: {
                              children: [
                                {
                                  name: 'link',
                                  label: t('Link'),
                                  visible: true,
                                  props: { target: '_self' },
                                  styles: {},
                                  events: [],
                                  elements: {
                                    children: [
                                      {
                                        name: 'flex',
                                        label: t('Flex'),
                                        visible: true,
                                        props: {
                                          direction: 'horizontal',
                                          align: 'center',
                                          gap: 8,
                                          flexGrow: false,
                                          flexShrink: false,
                                          emptyText: t(
                                            'Please drag the component here',
                                          ),
                                        },
                                        styles: {
                                          width: { width: '100%' },
                                          height: { height: '48px' },
                                          margin: { marginBottom: 0 },
                                          background: {},
                                        },
                                        events: [],
                                        elements: {
                                          children: [
                                            {
                                              name: 'image',
                                              label: t('Image'),
                                              visible: true,
                                              props: {
                                                width: '28px',
                                                height: '28px',
                                                id: '',
                                                preview: false,
                                              },
                                              styles: {},
                                              events: [],
                                              elements: {},
                                            },
                                            {
                                              name: 'simple-text',
                                              label: t('Simple Text'),
                                              visible: true,
                                              props: { value: 'NocoX' },
                                              styles: {
                                                color: { color: '#fdfdfd' },
                                                fontSize: { fontSize: 18 },
                                                fontWeight: {
                                                  fontWeight: '600',
                                                },
                                                background: {},
                                              },
                                              events: [],
                                              elements: {},
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      name: 'condition',
                      label: t('Condition'),
                      visible: true,
                      props: {
                        visible: false,
                        filter: {
                          conjunction: 1,
                          conditions: [
                            {
                              key: 'aB6i0ZnCBm3XPfg5mnVL',
                              name: 'collapsed',
                              value: true,
                              operator: 1,
                            },
                          ],
                        },
                      },
                      styles: {},
                      events: [],
                      elements: {
                        children: [
                          {
                            name: 'flex',
                            label: t('Flex'),
                            visible: true,
                            props: {
                              direction: 'horizontal',
                              align: 'center',
                              justify: 'center',
                              gap: 8,
                              flexGrow: true,
                              flexShrink: true,
                              emptyText: t('Please drag the component here'),
                            },
                            styles: {
                              width: { width: '100%' },
                              height: { height: '48px' },
                              background: {},
                            },
                            events: [],
                            elements: {
                              children: [
                                {
                                  name: 'link',
                                  label: t('Link'),
                                  visible: true,
                                  props: { target: '_self' },
                                  styles: {},
                                  events: [],
                                  elements: {
                                    children: [
                                      {
                                        name: 'image',
                                        label: t('Image'),
                                        visible: true,
                                        props: {
                                          width: '26px',
                                          height: '26px',
                                          id: '',
                                          preview: false,
                                        },
                                        styles: {},
                                        events: [],
                                        elements: {},
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      name: 'menu',
                      label: '菜单',

                      visible: true,
                      props: {
                        theme: 'dark',
                        mode: 'inline',
                        inlineIndent: 24,
                      },
                      styles: {},
                      events: [],
                      elements: {
                        children: [
                          {
                            name: 'menu-item',
                            label: '菜单项',
                            visible: true,
                            props: {
                              urlType: 'page',
                              page: '/3a17e249-6a72-0978-c518-2301ba08beff',
                              label: 'Dashboard',
                              icon: {
                                title: 'Home2',
                                tags: [
                                  'house',
                                  'dashboard',
                                  'living',
                                  'building',
                                ],
                                category: 'buildings',
                                name: 'home-2-outline',
                                content:
                                  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M10 12h4v4h-4z" /></svg>',
                                type: 'outline',
                              },
                            },
                            styles: {},
                            events: [],
                            elements: {},
                          },
                          {
                            name: 'menu-item',
                            label: '菜单项',

                            visible: true,
                            props: {
                              urlType: 'page',
                              page: '/3a17e249-6a72-0978-c518-2301ba08beff/users',
                              label: 'Users',
                              icon: {
                                title: 'Users',
                                tags: ['people', 'persons', 'accounts'],
                                category: 'system',
                                name: 'users-outline',
                                content:
                                  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>',
                                type: 'outline',
                              },
                            },
                            styles: {},
                            events: [],
                            elements: {},
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                name: 'layout',
                label: t('Layout'),

                visible: true,
                props: {},
                styles: { background: {} },
                events: [],
                elements: {
                  children: [
                    {
                      name: 'layout-header',
                      label: t('Header'),

                      visible: true,
                      props: {},
                      styles: { height: { height: '48px' } },
                      events: [],
                      elements: {},
                    },
                    {
                      name: 'layout-content',
                      label: t('Content'),
                      visible: true,
                      props: { width: '600px' },
                      styles: {},
                      events: [],
                      elements: {},
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
};
