import { t } from 'i18next';
import type { Column } from '@/database/stores';
import { UiType } from '@/types';

export function getWidgetByValueType(column: Column) {
  switch (column.uiType) {
    case UiType.Bool:
      return { name: 'checkbox' };
    case UiType.SingleText:
      return { name: 'input' };
    case UiType.LongText:
      return { name: 'textarea' };
    case UiType.Integer:
      return { name: 'number' };
    case UiType.Decimal:
      return { name: 'number' };
    case UiType.Time:
      return { name: 'time' };
    case UiType.Date:
      return { name: 'date' };
    case UiType.DateTime:
      return { name: 'datetime' };
    case UiType.Percent:
      return { name: 'number' };
    case UiType.Image:
      return { name: 'image' };
    case UiType.Attachment:
      return { name: 'attachment' };
    case UiType.Relation: {
      const options = {
        type: 'dataTable',
        dataTable: {
          tableId: column.info.relation?.tableId,
          columnName: column.info.relation?.displayColumnName,
        },
        options: undefined,
      };
      return { name: 'select', props: { options } };
    }
    default:
      return { name: 'input' };
  }
}

export function generateFormItemTemplate(column: Column) {
  const widget = getWidgetByValueType(column);

  return {
    name: 'form-item',
    props: {
      required: column.required,
    },
    elements: {
      label: [
        {
          name: 'flex',
          label: t('Form Item Title'),
          elements: {
            children: [
              {
                name: 'rich-text',
                props: { singleLine: true, value: column.title },
              },
            ],
          },
        },
      ],
      children: [
        {
          name: 'inner-container',
          label: t('Form Item Content'),
          elements: {
            children: [
              {
                name: 'form-data-item',
                props: {
                  name: column.columnName,
                },
                elements: {
                  children: [
                    {
                      name: widget.name,
                      props: {
                        size: 'small',
                        ...widget.props,
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
}

export function getSubmitFormItem() {
  return {
    name: 'form-item',
    props: { wrapperColOffset: 4 },
    elements: {
      children: [
        {
          name: 'inner-container',
          label: t('Submit Button'),
          elements: {
            children: [
              {
                name: 'button',
                props: {
                  color: 'primary',
                  variant: 'solid',
                  size: 'small',
                },
                elements: {
                  children: [
                    {
                      name: 'flex',
                      props: {
                        align: 'center',
                        justify: 'center',
                        gap: 4,
                      },
                      elements: {
                        children: [
                          {
                            name: 'rich-text',
                            props: { value: 'Submit' },
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
}
