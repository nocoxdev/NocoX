import { use } from 'react';
import { Form } from 'antd';
import { t } from 'i18next';
import { FilterConjunction, Operator } from '@/components/DataFilter/type';
import NoWidget from '@/components/NoWidget';
import { hasChildren } from '@/utils/helpers';
import { ProTableWidgetContext } from '../context/ProTableWidgetContext';

export interface QueryItemWidgetProps {
  fieldName?: string;
  operator?: Operator;
  children?: React.ReactNode | undefined;
  style?: React.CSSProperties;
  className?: string;
}

const QueryItemWidget = (props: QueryItemWidgetProps) => {
  const { fieldName, operator, children, style, className } = props;
  const { setPrimaryFilter, setKeywords, keywords, primaryFilter } = use(
    ProTableWidgetContext,
  );

  const handleChange = (_: any, values: any) => {
    if (fieldName) {
      setPrimaryFilter((pre) => {
        const condition = {
          key: fieldName,
          fieldId: fieldName,
          value: values[fieldName],
          operator: operator || Operator.Contain,
        };

        if (!pre) {
          return {
            conjunction: FilterConjunction.And,
            conditions: [condition],
          };
        } else {
          const conditions = pre.conditions.filter(
            (item) => item.key !== fieldName,
          );

          return {
            conjunction: pre.conjunction,
            conditions: [...conditions, condition],
          };
        }
      });
    } else {
      setKeywords(values['keywords'] || '');
    }
  };

  return (
    <Form
      style={style}
      className={className}
      layout="inline"
      onValuesChange={handleChange}
      initialValues={{
        ...{ keywords },
        ...(fieldName && {
          [fieldName]: primaryFilter?.conditions?.[0]?.value,
        }),
      }}
    >
      <Form.Item name={fieldName || 'keywords'} noStyle>
        {hasChildren(children) ? (
          children
        ) : (
          <NoWidget
            height={28}
            width={200}
            description={t('Drag the data component here')}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default QueryItemWidget;
