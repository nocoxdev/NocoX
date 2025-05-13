import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';

export interface PageFormModalValues {
  path: string;
  title: string;
  description: string;
}

interface PageFormModalProps extends EnhancedModalProps {
  open: boolean;
  initialValues?: PageFormModalValues;
  submiting: boolean;
  onSubmit: (values: PageFormModalValues) => void;
}

const PageFormModal = (props: PageFormModalProps) => {
  const { initialValues, submiting, onSubmit, onClose, ...restProps } = props;

  return (
    <EnhancedModal {...restProps} onClose={onClose} destroyOnHidden width={480}>
      <Form
        layout="vertical"
        initialValues={{ path: '/', ...initialValues }}
        size="small"
        onFinish={onSubmit}
      >
        <Form.Item
          rules={[{ required: true, message: t('Please enter the title') }]}
          name="title"
          label={t('Title')}
          required
        >
          <Input size="small" />
        </Form.Item>
        <Form.Item name="path" label={t('Path')}>
          <Input size="small" />
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

export default PageFormModal;
