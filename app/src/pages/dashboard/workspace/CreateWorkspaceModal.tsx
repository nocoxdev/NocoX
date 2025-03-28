import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { useWorkspaceStore } from './selectors';

interface CreateWorkspaceModalProps extends EnhancedModalProps {}

const CreateWorkspaceModal = observer((props: CreateWorkspaceModalProps) => {
  const { onClose } = props;
  const store = useWorkspaceStore();
  const message = useMessage();

  const handleCreate = async (values: { title: string }) => {
    const resp = await store.createWorkspace(values.title);
    if (resp.success) {
      message.success(t('Create success'));
      onClose?.();
    } else {
      message.error(resp.message);
    }
  };

  return (
    <EnhancedModal
      title={t('Create workspace')}
      {...props}
      width={400}
      onClose={onClose}
      wrapperStyle={{ paddingBottom: 0 }}
    >
      <Form onFinish={handleCreate}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: t('Please enter the workspace name'),
            },
          ]}
        >
          <Input
            placeholder={t('Please enter the workspace name')}
            allowClear
            style={{ marginBlock: 8 }}
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="end" gap={12}>
            <Button onClick={onClose} size="small" type="text">
              {t('Cancel')}
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              loading={store.requestStates.create.status === 'pending'}
              size="small"
            >
              {t('Create')}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </EnhancedModal>
  );
});

export default CreateWorkspaceModal;
