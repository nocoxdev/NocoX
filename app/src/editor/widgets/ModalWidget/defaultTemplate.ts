import { t } from 'i18next';

export const defaultTemplate = {
  name: 'modal',
  elements: {
    title: [
      {
        name: 'inner-container',
        label: t('Title'),
        props: {
          height: '100%',
          width: 'auto',
        },
        elements: {
          children: [
            {
              name: 'rich-text',
              props: { value: t('Dialog 1'), singleLine: true },
            },
          ],
        },
      },
    ],
    footer: [
      {
        name: 'flex',
        label: t('Footer'),
        props: {
          direction: 'horizontal',
          align: 'center',
          justify: 'end',
        },
        elements: {
          children: [
            {
              name: 'button',
              props: { color: 'default', variant: 'outlined', size: 'small' },
              elements: {
                children: [
                  {
                    name: 'rich-text',
                    props: { value: t('Cancel'), singleLine: true },
                  },
                ],
              },
            },
            {
              name: 'button',
              props: { color: 'primary', variant: 'solid', size: 'small' },
              elements: {
                children: [
                  {
                    name: 'rich-text',
                    props: { value: t('Confirm'), singleLine: true },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
    children: [
      {
        name: 'inner-container',
        label: t('Content'),
        props: {
          height: '100%',
        },
      },
    ],
  },
};
