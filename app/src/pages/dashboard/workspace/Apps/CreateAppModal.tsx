import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { genAppRandomColor } from '@/utils/helpers';
import { useAppStore, useWorkspace } from '../selectors';

interface CreateAppModalProps extends EnhancedModalProps {}

const CreateAppModal = observer((props: CreateAppModalProps) => {
  const { onClose } = props;
  const store = useAppStore();
  const workspace = useWorkspace();
  const message = useMessage();

  const handleCreate = async (values: { title: string }) => {
    if (!workspace) {
      message.error(t('Workspace not found'));
      return;
    }
    const resp = await store.create({
      workspaceId: workspace.id,
      title: values.title,
      color: genAppRandomColor(),
    });

    if (resp.success) {
      message.success(t('Create success'));
      onClose?.();
    } else {
      message.error(resp.message);
    }
  };

  return (
    <EnhancedModal
      title={t('Create app')}
      {...props}
      width={400}
      onClose={onClose}
      wrapperStyle={{ paddingBottom: 0 }}
    >
      <Form
        onFinish={handleCreate}
        initialValues={{ title: t('Untitled app') }}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: t('Please enter the app title'),
            },
          ]}
        >
          <Input
            placeholder={t('Please enter the app title')}
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

export default CreateAppModal;
