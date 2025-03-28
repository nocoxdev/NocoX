import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import type { Rule } from 'antd/es/form';
import { t } from 'i18next';
import NoWidget from '@/components/NoWidget';
import type { ValidationValue } from '@/editor/controls/properties/ValidationControl/type';
import { hasChildren } from '@/utils/helpers';

interface FieldItemViewProps extends FormItemProps {
  validations?: ValidationValue[];
}

const FieldItemView = (props: FieldItemViewProps) => {
  const { validations, children, className, style, ...restProps } = props;

  const rules = validations?.map((item) => ({
    ...item,
    ...(item.pattern && { pattern: new RegExp(item.pattern) }),
  }));

  return (
    <div style={style} className={className}>
      <Form.Item {...restProps} noStyle rules={rules as Rule[]}>
        {hasChildren(children) ? (
          children
        ) : (
          <NoWidget
            height={28}
            width="100%"
            description={t('Drag data components here')}
          />
        )}
      </Form.Item>
    </div>
  );
};

export default FieldItemView;
