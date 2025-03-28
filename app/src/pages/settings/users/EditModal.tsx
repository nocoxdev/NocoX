import { Fragment } from 'react';
import { IconUserEdit } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { UserApi } from '@/services/api';
import { usePost } from '@/utils/hooks';
import RoleSelect from '../roles/RoleSelect';

interface EditModalProps extends EnhancedModalProps {
  id: string;
}

const EditModal = (props: EditModalProps) => {
  const { id, onClose, onOk, ...restProps } = props;

  const message = useMessage();

  const { submitting, postAsync } = usePost(UserApi.update);

  const { data: resp, loading, runAsync } = useRequest(() => UserApi.get(id));

  const handleUpdate = async (values: any) => {
    const resp = await postAsync({
      ...values,
      id,
    });

    if (resp.success) {
      message.success(t('Update user success'));

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
          <IconUserEdit size={14} />
          {t('Edit User')}
        </Fragment>
      }
      loading={loading}
      error={resp?.success !== true && resp?.message}
      onErrorReset={() => runAsync()}
    >
      {!loading && (
        <Form
          colon={false}
          size="small"
          layout="vertical"
          initialValues={{
            ...resp?.data,
            roles: resp?.data?.roles.map((item) => item.id),
          }}
          style={{ width: '100%' }}
          onFinish={handleUpdate}
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

          <Form.Item>
            <Flex justify="end" gap={10}>
              <Button type="default" size="small" onClick={() => runAsync()}>
                {t('Reset')}
              </Button>
              <Button
                type="primary"
                size="small"
                htmlType="submit"
                loading={submitting}
              >
                {t('Save')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      )}
    </EnhancedModal>
  );
};

export default EditModal;
