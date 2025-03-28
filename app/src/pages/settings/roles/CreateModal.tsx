import { Fragment } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { RoleApi } from '@/services/api';
import { usePost } from '@/utils/hooks';

interface CreateModalProps extends EnhancedModalProps {}

const CreateModal = (props: CreateModalProps) => {
  const { onClose, onOk, ...restProps } = props;
  const message = useMessage();
  const { submitting, postAsync } = usePost(RoleApi.create);

  return (
    <EnhancedModal
      {...restProps}
      onClose={onClose}
      width={400}
      title={
        <Fragment>
          <IconPlus size={14} />
          {t('Create')}
        </Fragment>
      }
    >
      <Form
        colon={false}
        size="small"
        layout="vertical"
        onFinish={async (values) => {
          const resp = await postAsync(values);

          if (resp.success) {
            message.success(t('Create role success'));
            onOk?.();
          } else {
            message.error(resp.message);
          }
        }}
      >
        <Form.Item
          name="name"
          label={t('Name')}
          required
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label={t('Description')}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Flex justify="end" gap={12}>
            <Button type="text" size="small" onClick={() => onClose?.()}>
              {t('Cancel')}
            </Button>
            <Button
              type="primary"
              size="small"
              htmlType="submit"
              loading={submitting}
            >
              {t('Create')}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </EnhancedModal>
  );
};

export default CreateModal;
