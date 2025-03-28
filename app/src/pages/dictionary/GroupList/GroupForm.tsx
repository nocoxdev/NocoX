import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import type { DictionaryGroupResponse } from '@/services/responses';

export type DictionaryGroupFormValues = Omit<DictionaryGroupResponse, 'id'>;

interface GroupFormProps {
  initialValues?: DictionaryGroupFormValues;
  submiting?: boolean;
  onCancel: () => void;
  onSubmit: (values: DictionaryGroupFormValues) => void;
}

const GroupForm = (props: GroupFormProps) => {
  const { initialValues, submiting, onCancel, onSubmit } = props;

  return (
    <Form
      layout="vertical"
      style={{ marginTop: 12 }}
      initialValues={initialValues}
      onFinish={onSubmit}
      size="small"
    >
      <Form.Item
        name="title"
        label={t('Title')}
        rules={[{ required: true, message: '' }]}
      >
        <Input size="small" />
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
            {t('Cancel')}
          </Button>
          <Button
            type="primary"
            size="small"
            style={{ width: 60 }}
            htmlType="submit"
            loading={submiting}
          >
            {t('Ok')}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default GroupForm;
