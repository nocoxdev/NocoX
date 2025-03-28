import { Form } from 'antd';
import type { ValidationFieldType, ValidationValue } from './type';

export interface EditValidationProps {
  fields: ValidationFieldType[];
  value?: ValidationValue;
  onChange?: (value: ValidationValue) => void;
}

const EditForm = (props: EditValidationProps) => {
  const { fields, value, onChange } = props;

  return (
    <Form
      size="small"
      layout="vertical"
      style={{ width: 300 }}
      onValuesChange={(_, values) => {
        onChange?.(values);
      }}
      initialValues={value}
    >
      {fields.map((field) => {
        if (field.visible === false) return null;

        const Component = field.component;

        return (
          <Form.Item
            key={field.name}
            label={field.label}
            required={field.required}
            name={field.name}
          >
            <Component {...field.props} />
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default EditForm;
