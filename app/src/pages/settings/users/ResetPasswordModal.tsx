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

interface ResetPasswordModalProps extends EnhancedModalProps {
  id: string;
}

const ResetPasswordModal = (props: ResetPasswordModalProps) => {
  const { id, onClose, onOk, ...restProps } = props;
  const message = useMessage();
  const { submitting, postAsync } = usePost(UserApi.resetPassword);

  const handleChangePassword = async (values: any) => {
    const { newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error(t('New password and confirm password do not match'));
      return;
    }

    const data = {
      id,
      newPassword: md5(newPassword),
      confirmPassword: md5(confirmPassword),
    };

    const resp = await postAsync(data);

    if (resp.success) {
      message.success(t('Reset password success'));
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
          {t('Reset password')}
        </Fragment>
      }
    >
      <Form
        colon={false}
        layout="vertical"
        size="small"
        onFinish={handleChangePassword}
      >
        <Form.Item name="newPassword" label={t('New Password')}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="confirmPassword" label={t('Confirm Password')}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Flex justify="end" gap={12}>
            <Button type="text" size="small" onClick={() => onClose?.()}>
              {t('Cancel')}
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {t('Reset password')}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </EnhancedModal>
  );
};

export default ResetPasswordModal;
