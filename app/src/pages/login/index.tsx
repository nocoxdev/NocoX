import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { t } from 'i18next';
import md5 from 'md5';
import { styled, useTheme } from 'styled-components';
import bg from '@/assets/login-bg.svg';
import logo from '@/assets/logo.svg';
import { ADMIN_BASE_URL } from '@/constants';
import { useMessage, useUser } from '@/selectors';
import { AccountApi } from '@/services/api';
import { usePost } from '@/utils/hooks';
import { LangSetting } from '../common/PageHeader';

const StyledContainer = styled.div`
  height: 100vh;
  .ant-pro-form-login-page-notice {
    display: none;
  }
  .ant-pro-form-login-page {
    display: flex;
    max-width: 100%;
    max-height: 720px;
    box-sizing: border-box;
  }
`;

const StyledLang = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

const Login = () => {
  const theme = useTheme();
  const user = useUser();
  const message = useMessage();
  const { submitting, postAsync } = usePost(AccountApi.login);

  const handleSubmit = async (data: { email: string; password: string }) => {
    const resp = await postAsync({
      email: data.email,
      password: md5(data.password),
    });

    if (resp.success && resp.data) {
      user.updateToken(resp.data.accessToken);
      message.success(t('Login success, redirecting...'));

      const redirect = new URLSearchParams(window.location.search).get(
        'redirect',
      );

      setTimeout(() => {
        window.location.href = redirect
          ? decodeURIComponent(redirect)
          : `${ADMIN_BASE_URL}/`;
      }, 1000);
    } else {
      message.error(resp.message);
    }
  };

  return (
    <ProConfigProvider dark={false}>
      <StyledContainer>
        <StyledLang>
          <LangSetting size={20} />
        </StyledLang>
        <LoginFormPage
          logo={logo}
          title="NocoX"
          subTitle="NocoX is an open-source no-code framework."
          backgroundImageUrl={bg}
          onFinish={(data: { email: string; password: string }) =>
            handleSubmit(data)
          }
          initialValues={{ email: 'admin@nocox.net', password: '123456' }}
          loading={submitting}
          style={{
            backgroundColor: 'rgb(84 109 222 / 20%)',
            maxHeight: '100vh',
          }}
        >
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: (
                <UserOutlined
                  style={{
                    color: theme.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={t('Please input email...')}
            rules={[
              {
                required: true,
                type: 'email',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: (
                <LockOutlined
                  style={{
                    color: theme.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={t('Please input password...')}
            rules={[
              {
                required: true,
                message: t('Please input password!'),
              },
            ]}
          />

          <div
            style={{
              marginBlockStart: 30,
            }}
          ></div>
        </LoginFormPage>
      </StyledContainer>
    </ProConfigProvider>
  );
};

export default Login;
