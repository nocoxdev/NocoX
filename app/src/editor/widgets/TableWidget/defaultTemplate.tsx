import { t } from 'i18next';

export const defaultTemplate = {
  name: 'table',
  props: {
    size: 'small',
    data: [
      {
        id: '1',
        name: 'Tom',
        age: 20,
        address: '11111',
      },
    ],
  },
  elements: {
    toolbar: [
      {
        name: 'table-toolbar',
        props: {
          emptyText: t('Drag the table toolbar component here'),
        },
        elements: {
          children: [
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
                          name: 'icon',
                          props: {
                            value: { name: 'circle-plus-outline' },
                          },
                        },
                        {
                          name: 'rich-text',
                          props: {
                            value: t('Add'),
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
              name: 'table-query-item',
              elements: {
                children: [
                  {
                    name: 'table-data-filter',
                    props: {
                      size: 'small',
                    },
                  },
                ],
              },
            },
            {
              name: 'table-query-item',
              elements: {
                children: [
                  {
                    name: 'table-data-sort',
                    props: {
                      size: 'small',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
    columns: [
      {
        name: 'table-columns',
        elements: {
          children: [
            {
              name: 'table-column',
              props: {
                dataIndex: 'index',
                title: '',
                valueType: 'indexBorder',
                width: 60,
              },
              elements: {
                cell: [
                  {
                    name: 'table-body-cell',
                  },
                ],
              },
            },
            {
              name: 'table-column',
              props: {
                dataIndex: 'name',
                title: t('Name'),
                valueType: 'text',
              },
              elements: {
                cell: [
                  {
                    name: 'table-body-cell',
                  },
                ],
              },
            },
            {
              name: 'table-column',
              props: {
                dataIndex: 'age',
                title: t('Age'),
                valueType: 'digit',
              },
              elements: {
                cell: [
                  {
                    name: 'table-body-cell',
                  },
                ],
              },
            },
            {
              name: 'table-column',
              props: {
                dataIndex: 'address',
                title: t('Address'),
                valueType: 'text',
              },
              elements: {
                cell: [
                  {
                    name: 'table-body-cell',
                  },
                ],
              },
            },
            {
              name: 'table-column',
              props: {
                dataIndex: 'actions',
                title: t('Actions'),
                valueType: 'custom',
                width: 200,
              },
              elements: {
                cell: [
                  {
                    name: 'table-body-cell',
                  },
                ],
              },
            },
          ],
        },
      },
    ],

    pagination: [
      {
        name: 'pagination',
        props: {
          position: ['bottomRight'],
          pageSize: 5,
        },
      },
    ],
  },
};

export const defaultIndexColumnTemplate = {
  name: 'table-column',
  props: {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 60,
    title: '',
  },
  elements: {
    cell: [
      {
        name: 'table-body-cell',
      },
    ],
  },
};

export const defaultAcitonsColumnTemplate = {
  name: 'table-column',
  props: {
    dataIndex: 'actions',
    valueType: 'custom',
    width: 200,
  },
  elements: {
    cell: [
      {
        name: 'table-body-cell',
      },
    ],
  },
};
