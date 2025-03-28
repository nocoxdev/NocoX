import type { FormItemProps } from 'antd';
import { Form } from 'antd';

const FormItemView = (props: FormItemProps) => {
  const { className, ...restProps } = props;
  return <Form.Item {...restProps} rootClassName={className} />;
};

export default FormItemView;
