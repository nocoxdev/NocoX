import { Col, Row } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import { useApp } from '@/editor/selectors';
import ResourceSelect from '@/pages/common/Resource/ResourceSelect';
import { useMessage } from '@/selectors';
import { StyledItemLabel } from './styled';

const FaviconChanger = observer(() => {
  const app = useApp();
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
    <Row align="middle">
      <Col span={4}>
        <StyledItemLabel>
          <span>{t('Favicon')}</span>
          <span>{t('Select or upload favicon')}</span>
        </StyledItemLabel>
      </Col>
      <Col span={20}>
        <ResourceSelect
          hasInput={false}
          onChange={handleChangeFavicon}
          value={app.favicon}
          style={{
            width: 120,
            height: 108,
            padding: 4,
            borderRadius: theme.borderRadius,
            border: `1px solid ${theme.colorBorderSecondary}`,
          }}
        />
      </Col>
    </Row>
  );
});

export default FaviconChanger;
