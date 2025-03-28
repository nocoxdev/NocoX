import { t } from 'i18next';

export const defaultTemplate = {
  name: 'popconfirm',
  props: {
    size: 'small',
    title: 'Are you confirm?',
  },
  elements: {
    actions: [
      {
        name: 'flex',
        props: {
          gap: 8,
          justify: 'flex-end',
        },
        elements: {
          children: [
            {
              name: 'button',
              props: {
                color: 'default',
                size: 'small',
                variant: 'outlined',
              },
              elements: {
                children: [
                  {
                    name: 'flex',
                    elements: {
                      children: [
                        {
                          name: 'rich-text',
                          props: {
                            value: t('Cancel'),
                            singleLine: true,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              name: 'button',
              props: {
                color: 'primary',
                size: 'small',
                variant: 'solid',
              },
              elements: {
                children: [
                  {
                    name: 'flex',
                    elements: {
                      children: [
                        {
                          name: 'rich-text',
                          props: {
                            value: t('Ok'),
                            singleLine: true,
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
    ],
  },
};
