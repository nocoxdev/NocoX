import { Button, Result } from 'antd';
import { t } from 'i18next';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title={t('404')}
    subTitle={t('Sorry, the page you visited does not exist.')}
    extra={<Button type="primary">{t('Back Home')}</Button>}
  />
);

export default NoFoundPage;
