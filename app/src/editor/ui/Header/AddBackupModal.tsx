import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { HistoryApi } from '@/services/api';
import { usePost } from '@/utils/hooks';

interface AddBackupModalProps extends EnhancedModalProps {
  appId: string;
}

const AddBackupModal = (props: AddBackupModalProps) => {
  const { appId, onClose, onOk, ...restProps } = props;
  const message = useMessage();

  const { submitting, postAsync } = usePost(HistoryApi.add);

  const handleAddBackup = async (values: { comment: string }) => {
    const resp = await postAsync({
      appId,
      comment: values.comment,
    });

    if (resp.success) {
      message.success(t('Comment success'));
      onOk?.();
    } else {
      message.error(resp.message || t('Comment failed'));
    }
  };

  return (
    <EnhancedModal
      title={t('Backup')}
      destroyOnHidden
      onClose={onClose}
      {...restProps}
    >
      <Form
        layout="vertical"
        initialValues={{ history }}
        onFinish={handleAddBackup}
      >
        <Form.Item name="comment">
          <Input.TextArea
            size="small"
            placeholder={t('Please enter a comment')}
            rows={10}
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="flex-end" gap={12}>
            <Button size="small" type="text" onClick={() => onClose?.()}>
              {t('Cancel')}
            </Button>
            <Button
              size="small"
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              {t('Submit')}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </EnhancedModal>
  );
};

export default AddBackupModal;
