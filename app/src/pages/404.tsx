import { useNavigate } from 'react-router';
import { Button, Result } from 'antd';
import { t } from 'i18next';

const NoFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('Sorry, the page you visited does not exist.')}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          {t('Back Home')}
        </Button>
      }
    />
  );
};

export default NoFoundPage;
