import { Button, Checkbox, Flex, Form, Input, InputNumber } from 'antd';
import { t } from 'i18next';
import type { DictionaryResponse } from '@/services/responses';

export type DictionaryFormValues = Omit<DictionaryResponse, 'id' | 'children'>;

interface DictionaryFormProps {
  initialValues?: DictionaryFormValues;
  okText?: string;
  cancelText?: string;
  submiting?: boolean;
  onCancel: () => void;
  onSubmit: (values: DictionaryFormValues) => void;
}

const DictionaryForm = (props: DictionaryFormProps) => {
  const { initialValues, okText, cancelText, submiting, onCancel, onSubmit } =
    props;

  return (
    <Form
      layout="vertical"
      style={{ marginTop: 12 }}
      initialValues={initialValues}
      onFinish={onSubmit}
      size="small"
    >
      <Form.Item
        name="name"
        label={t('Name')}
        rules={[{ required: true, message: '' }]}
      >
        <Input size="small" />
      </Form.Item>

      <Form.Item
        name="title"
        label={t('Title')}
        rules={[{ required: true, message: '' }]}
      >
        <Input size="small" />
      </Form.Item>

      <Form.Item name="order" label={t('Order Index')}>
        <InputNumber size="small" />
      </Form.Item>

      <Form.Item name="enabled" label={t('Enabled')} valuePropName="checked">
        <Checkbox />
      </Form.Item>

      <Form.Item name="description" label={t('Description')}>
        <Input.TextArea rows={6} size="small" />
      </Form.Item>

      <Form.Item>
        <Flex gap={8} justify="flex-end">
          <Button
            size="small"
            type="text"
            style={{ width: 60 }}
            onClick={onCancel}
          >
            {cancelText || t('Cancel')}
          </Button>
          <Button
            type="primary"
            size="small"
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

export default DictionaryForm;
