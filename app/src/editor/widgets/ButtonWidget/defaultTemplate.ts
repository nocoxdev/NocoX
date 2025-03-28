export const defaultTemplate = {
  name: 'button',
  elements: {
    children: [
      {
        name: 'flex',
        props: {
          direction: 'horizontal',
          align: 'center',
          justify: 'center',
        },
        elements: {
          children: [
            {
              name: 'icon',
            },
            {
              name: 'rich-text',
              props: {
                singleLine: true,
                value: 'Button',
              },
            },
          ],
        },
      },
    ],
  },
};
