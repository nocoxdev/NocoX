import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';

export interface TableFormValues {
  title: string;
  description: string;
}

interface TableFormProps {
  initialValues?: TableFormValues;
  okText?: string;
  cancelText?: string;
  submiting?: boolean;
  onCancel: () => void;
  onOk: (values: TableFormValues) => void;
}

const TableForm = (props: TableFormProps) => {
  const { initialValues, okText, cancelText, submiting, onCancel, onOk } =
    props;

  return (
    <Form
      layout="vertical"
      style={{ marginTop: 12 }}
      initialValues={initialValues}
      onFinish={onOk}
      size="small"
    >
      <Form.Item
        name="title"
        label={t('Title')}
        rules={[{ required: true, message: '' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label={t('Description')}>
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item>
        <Flex gap={8} justify="flex-end">
          <Button type="text" style={{ width: 60 }} onClick={onCancel}>
            {cancelText || t('Cancel')}
          </Button>
          <Button
            type="primary"
            style={{ width: 60 }}
            htmlType="submit"
            loading={submiting}
          >
            {okText || t('Ok')}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default TableForm;
