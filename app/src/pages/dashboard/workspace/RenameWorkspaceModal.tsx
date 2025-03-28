import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import type { WorkspaceResponse } from '@/services/responses';
import { useWorkspaceStore } from './selectors';

interface CreateWorkspaceModalProps extends EnhancedModalProps {
  workspace: WorkspaceResponse;
}

const RenameWorkspaceModal = observer((props: CreateWorkspaceModalProps) => {
  const { workspace, onClose, ...restProps } = props;
  const store = useWorkspaceStore();
  const message = useMessage();

  const handleRename = async (values: { name: string }) => {
    const resp = await store.updateWorkspace(workspace.id, values.name);

    if (resp.success) {
      message.success(t('Rename workspace success'));
      onClose?.();
    } else {
      message.error(resp.message);
    }
  };

  return (
    <EnhancedModal
      title={t('Rename workspace')}
      {...restProps}
      onClose={onClose}
      width={400}
      wrapperStyle={{ paddingBottom: 0 }}
    >
      <Form initialValues={{ name: workspace.title }} onFinish={handleRename}>
        <Form.Item
          name="name"
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
              loading={store.requestStates.update.status === 'pending'}
              size="small"
            >
              {t('Save')}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </EnhancedModal>
  );
});

export default RenameWorkspaceModal;
