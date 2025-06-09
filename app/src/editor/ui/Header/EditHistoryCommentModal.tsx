import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { HistoryApi } from '@/services/api';
import type { AppHistoryResponse } from '@/services/responses';
import { usePost } from '@/utils/hooks';

interface EditHistoryCommentModalProps extends EnhancedModalProps {
  history: AppHistoryResponse;
}

const EditHistoryCommentModal = (props: EditHistoryCommentModalProps) => {
  const { history, onClose, onOk, ...restProps } = props;
  const { submitting, postAsync } = usePost(HistoryApi.comment);
  const message = useMessage();

  const handleAddComment = async (values: { comment: string }) => {
    const resp = await postAsync({
      id: history.id,
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
      title={t('Comment')}
      destroyOnHidden
      onClose={onClose}
      {...restProps}
    >
      <Form
        layout="vertical"
        initialValues={{ comment: history.comment }}
        onFinish={handleAddComment}
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
              {t('Save')}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </EnhancedModal>
  );
};

export default EditHistoryCommentModal;
