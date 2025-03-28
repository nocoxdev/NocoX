import { useEffect, useState } from 'react';
import { Col, Flex, Row } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import type { ConfirmInputMode } from '@/components/ConfirmInput';
import ConfirmInput from '@/components/ConfirmInput';
import { useApp } from '@/editor/selectors';
import { useMessage } from '@/selectors';
import { StyledItemLabel } from './styled';

const AppNameChanger = observer(() => {
  const message = useMessage();
  const app = useApp();
  const theme = useTheme();
  const [mode, setMode] = useState<ConfirmInputMode>('readonly');
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(app.title);
  }, [app.title]);

  const handleConfirm = async () => {
    setMode('loading');
    const resp = await app.modifyTitle(title);
    if (resp.success) {
      setMode('readonly');
      message.success(t('Modify app name success'));
    } else {
      setMode('inputing');
      message.error(resp.message);
    }
  };

  return (
    <Row align="middle">
      <Col span={4}>
        <StyledItemLabel>
          <Flex align="center" gap={4}>
            <span>{t('Title')}</span>
            <span
              style={{
                color: theme.colorErrorText,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              *
            </span>
          </Flex>
          <span>{t('App name')}</span>
        </StyledItemLabel>
      </Col>
      <Col span={20}>
        <ConfirmInput
          value={title}
          size="small"
          variant="borderless"
          mode={mode}
          onChange={(val) => setTitle(val)}
          onEdit={() => setMode('inputing')}
          onConfirm={handleConfirm}
          onCancel={() => setMode('readonly')}
          style={{ width: 'auto' }}
        />
      </Col>
    </Row>
  );
});

export default AppNameChanger;
