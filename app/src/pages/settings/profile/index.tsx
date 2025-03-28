import { Button, Form, Input } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { StyledContentContainer } from '@/pages/common/styled';
import { useMessage, useUser } from '@/selectors';
import { StyledFormContainer } from '../styled';
import AvatarInput from './AvatarInput';

const Profile = observer(() => {
  const user = useUser();
  const message = useMessage();

  const handleSubmitProfile = async (values: any) => {
    const resp = await user.updateProfile(values);

    if (resp.success) {
      message.success('Update profile success');
    } else {
      message.error(resp.message);
    }
  };

  return (
    <StyledContentContainer>
      <StyledFormContainer>
        <Form
          colon={false}
          size="small"
          layout="vertical"
          initialValues={user.profile}
          onFinish={handleSubmitProfile}
          wrapperCol={{ span: 6 }}
          labelAlign="left"
          style={{ width: '100%' }}
        >
          <Form.Item name="avatar" label={t('Avatar')}>
            <AvatarInput userName={user.profile?.userName} />
          </Form.Item>
          <Form.Item
            name="userName"
            label={t('User Name')}
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
          <Form.Item name="description" label={t('About me')}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={user.requestStates.updateProfile.status === 'pending'}
            >
              {t('Save changes')}
            </Button>
          </Form.Item>
        </Form>
      </StyledFormContainer>
    </StyledContentContainer>
  );
});

export default Profile;
