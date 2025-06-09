import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';

export interface GroupFormModalValues {
  title: string;
  description: string;
}

interface GroupFormModalProps extends EnhancedModalProps {
  open: boolean;
  initialValues?: GroupFormModalValues;
  submiting: boolean;
  onSubmit: (values: GroupFormModalValues) => void;
}

const GroupFormModal = (props: GroupFormModalProps) => {
  const { initialValues, submiting, onSubmit, onClose, ...restProps } = props;

  return (
    <EnhancedModal {...restProps} onClose={onClose} destroyOnHidden width={480}>
      <Form
        layout="vertical"
        initialValues={initialValues}
        size="small"
        onFinish={onSubmit}
      >
        <Form.Item
          label={t('Title')}
          name="title"
          required
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={t('Description')} name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Flex justify="flex-end" gap={8}>
            <Button type="text" htmlType="button" onClick={onClose}>
              {t('Cancel')}
            </Button>

            <Button type="primary" htmlType="submit" loading={submiting}>
              {t('Submit')}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </EnhancedModal>
  );
};

export default GroupFormModal;
