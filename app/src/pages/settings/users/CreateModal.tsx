import { Fragment } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import md5 from 'md5';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { UserApi } from '@/services/api';
import { usePost } from '@/utils/hooks';
import RoleSelect from '../roles/RoleSelect';

const CreateModal = (props: EnhancedModalProps) => {
  const { onClose, onOk, ...restProps } = props;
  const message = useMessage();

  const { submitting, postAsync } = usePost(UserApi.create);

  const handleCreate = async (values: any) => {
    const resp = await postAsync({
      ...values,
      password: md5(values.password),
    });

    if (resp.success) {
      message.success(t('Create user success'));
      onOk?.();
    } else {
      message.error(resp.message);
    }
  };

  return (
    <EnhancedModal
      {...restProps}
      onClose={onClose}
      width={400}
      title={
        <Fragment>
          <IconUserPlus size={14} />
          {t('New User')}
        </Fragment>
      }
    >
      <Form
        colon={false}
        size="small"
        layout="vertical"
        onFinish={handleCreate}
      >
        <Form.Item
          name="roles"
          label={t('Roles')}
          required
          rules={[{ required: true }]}
        >
          <RoleSelect mode="tags" />
        </Form.Item>
        <Form.Item
          name="userName"
          label={t('Username')}
          required
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label={t('Email')}
          required
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phoneNumber" label={t('Phone Number')}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label={t('Default Password')}>
          <Input.Password />
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
