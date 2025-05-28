import { IconPencil } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage, useUser } from '@/selectors';
import { RoleApi } from '@/services/api';
import { usePost } from '@/utils/hooks';

interface EditModalProps extends EnhancedModalProps {
  id: string;
}

const EditModal = observer((props: EditModalProps) => {
  const { id, onClose, onOk, ...restProps } = props;
  const user = useUser();
  const message = useMessage();
  const { data: resp, loading, runAsync } = useRequest(() => RoleApi.get(id));
  const { submitting, postAsync } = usePost(RoleApi.update);

  const handleUpdate = async (values: any) => {
    const resp = await postAsync({ ...values, id });
    if (resp.success) {
      message.success(t('Update role success'));
      user.fetchProfile();
      onOk?.();
    } else {
      message.error(resp.message);
    }
  };

  const title = (
    <>
      <IconPencil size={14} />
      {t('Edit')}
    </>
  );

  return (
    <EnhancedModal
      {...restProps}
      onClose={onClose}
      width={400}
      title={title}
      loading={loading}
      error={resp?.success !== true && resp?.message}
      onErrorReset={() => runAsync()}
    >
      <Form
        colon={false}
        size="small"
        layout="vertical"
        initialValues={resp?.data}
        style={{ width: '100%' }}
        onFinish={handleUpdate}
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
          <Flex justify="end" gap={10}>
            <Button type="text" size="small" onClick={() => onClose?.()}>
              {t('Cancel')}
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
    </EnhancedModal>
  );
});

export default EditModal;
