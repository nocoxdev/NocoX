import { useRef, useState } from 'react';
import { IconPencil } from '@tabler/icons-react';
import { Flex } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import type {
  ConfirmInputActions,
  ConfirmInputMode,
} from '@/components/ConfirmInput';
import ConfirmInput from '@/components/ConfirmInput';
import { useNotification } from '@/selectors';
import { AppApi } from '@/services/api';
import { useApp } from '../../selectors';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  position: relative;

  .ant-input {
    font-weight: 600;
    font-size: 14px;
  }
`;

const StyledAppName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;

  svg {
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colorPrimaryTextActive};
    }
  }
`;

const EditAppName = observer(() => {
  const app = useApp();
  const inputRef = useRef<ConfirmInputActions>(null);
  const theme = useTheme();
  const notification = useNotification();

  const [mode, setMode] = useState<ConfirmInputMode>('readonly');
  const [error, setError] = useState<string>('');

  const handleRename = async (title: string) => {
    if (!title.trim()) {
      notification.success(t('Name cannot be empty'));
      return;
    }
    if (title === app.title) {
      setMode('readonly');
      return;
    }

    setMode('loading');
    const resp = await AppApi.modifyTitle({ id: app.id, title: title });

    if (resp.success && resp.data) {
      notification.success(t('Modify name success'));
      app.modifyTitle(title);

      setMode('readonly');
      setError('');
    } else {
      notification.error(resp.message);
      setMode('inputing');
      setError(resp.message ?? '');
    }
  };

  return (
    <StyledWrapper>
      <Flex align="center" gap={4}>
        {mode === 'readonly' ? (
          <StyledAppName>
            {app.title}
            <IconPencil
              size={12}
              stroke={2}
              color={theme.colorPrimary}
              onClick={() => {
                setMode('inputing');
                setTimeout(() => {
                  inputRef.current?.focusAll();
                }, 1);
              }}
              style={{ cursor: 'pointer' }}
            />
          </StyledAppName>
        ) : (
          <ConfirmInput
            ref={inputRef}
            variant="borderless"
            onConfirm={(val) => handleRename(val)}
            onEdit={() => setMode('inputing')}
            defaultValue={app?.title || ''}
            mode={mode}
            error={error}
            onCancel={() => {
              setMode('readonly');
              setError('');
            }}
            style={{
              width: 180,
              borderBottom:
                mode === 'inputing'
                  ? `1px solid ${theme.colorBorderSecondary}`
                  : 'none',
            }}
          />
        )}
      </Flex>
    </StyledWrapper>
  );
});

export default EditAppName;
