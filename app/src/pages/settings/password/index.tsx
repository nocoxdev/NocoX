import { Button, Form, Input } from 'antd';
import { t } from 'i18next';
import md5 from 'md5';
import { observer } from 'mobx-react-lite';
import { StyledContentContainer } from '@/pages/common/styled';
import { useMessage, useUser } from '@/selectors';
import { StyledFormContainer } from '../styled';

const Password = observer(() => {
  const message = useMessage();
  const user = useUser();

  const handleSubmit = async (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error(t('New password and confirm password do not match'));
      return;
    }

    const data = {
      oldPassword: md5(oldPassword),
      newPassword: md5(newPassword),
      confirmPassword: md5(confirmPassword),
    };

    const resp = await user.changePassword(data);
    if (resp.success) {
      message.success(t('Password updated success'));
    } else {
      message.error(resp.message);
    }
  };

  return (
    <StyledContentContainer>
      <StyledFormContainer>
        <Form
          colon={false}
          layout="vertical"
          size="small"
          onFinish={handleSubmit}
          style={{ width: 400 }}
        >
          <Form.Item name="oldPassword" label={t('Current Password')}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label={t('New Password')}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label={t('Confirm Password')}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={user.requestStates.changePassword.status === 'pending'}
            >
              {t('Change password')}
            </Button>
          </Form.Item>
        </Form>
      </StyledFormContainer>
    </StyledContentContainer>
  );
});

export default Password;
