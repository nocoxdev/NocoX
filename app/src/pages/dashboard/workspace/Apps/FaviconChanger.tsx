import { Flex } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import ResourceSelect from '@/pages/common/Resource/ResourceSelect';
import { useMessage } from '@/selectors';
import { useCurApp } from '../selectors';

const FaviconChanger = observer(() => {
  const app = useCurApp();
  const message = useMessage();
  const theme = useTheme();

  const handleChangeFavicon = async (favicon: string) => {
    const resp = await app.changeFavicon(favicon);

    if (resp.success) {
      message.success(
        favicon ? t('Change favicon success') : t('Delete favicon success'),
      );
    } else {
      message.error(resp.message);
    }
  };

  return (
    <Flex>
      <ResourceSelect
        hasInput={false}
        onChange={handleChangeFavicon}
        value={app.data.favicon}
        placeholder={t('Select')}
        style={{
          width: 80,
          height: 60,
          padding: 4,
          borderRadius: theme.borderRadius,
          border: `1px solid ${theme.colorBorderSecondary}`,
        }}
        imageWrapperStyle={{
          minHeight: 60,
        }}
      />
    </Flex>
  );
});

export default FaviconChanger;
