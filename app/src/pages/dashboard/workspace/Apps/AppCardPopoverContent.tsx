import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { Divider, Flex, Popconfirm } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import type { ConfirmInputMode } from '@/components/ConfirmInput';
import ConfirmInput from '@/components/ConfirmInput';
import Loading from '@/components/Loading';
import { useMessage } from '@/selectors';
import { useCurApp } from '../selectors';
import AppColorSeletor from './AppColorSeletor';

const StyledActionItem = styled(Flex)`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  height: ${({ theme }) => theme.controlHeight}px;
  font-size: ${({ theme }) => theme.fontSize}px;
  width: 100%;
  padding: 0px 6px;
  box-sizing: border-box;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colorTextSecondary};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.controlItemBgHover};
  }

  &.delete {
    color: ${({ theme }) => theme.colorErrorText};
    &:hover {
      background-color: ${({ theme }) => theme.colorErrorBgHover};
    }
  }
`;

const PopoverContent = observer(() => {
  const app = useCurApp();
  const message = useMessage();

  const [mode, setMode] = useState<ConfirmInputMode>('readonly');
  const [error, setError] = useState<string>('');

  if (!app) {
    return null;
  }

  const handleModifyTitle = async (title: string) => {
    if (!title.trim()) {
      message.success(t('Title cannot be empty'));
      return;
    }

    if (title === app.data.title) {
      setMode('readonly');
      return;
    }

    setMode('loading');
    const resp = await app.modifyTitle(title);
    if (resp.success) {
      setMode('readonly');
      setError('');
      message.success(t('Modified success'));
    } else {
      setMode('inputing');
      setError(resp?.message ?? '');
    }
  };

  const handleRemove = async () => {
    const resp = await app.delete(app.id);

    if (resp.success) {
      message.success(t('Delete success'));
    } else {
      message.error(resp.message);
    }
  };

  return (
    <Flex gap={8} vertical style={{ width: 244 }}>
      <ConfirmInput
        variant="borderless"
        onConfirm={(val) => handleModifyTitle(val)}
        onCancel={() => {
          setMode('readonly');
          setError('');
        }}
        defaultValue={app.data.title}
        mode={mode}
        onEdit={() => setMode('inputing')}
        error={error}
      />
      <AppColorSeletor />
      <Divider style={{ marginBlock: 0 }} />

      <Popconfirm
        title={t('Delete app')}
        description={t('Are you sure to delete this app?')}
        onConfirm={() => handleRemove()}
        okText={t('Confirm')}
        okButtonProps={{ danger: true }}
        cancelText={t('Cancel')}
        placement="bottom"
        styles={{
          body: {
            width: 228,
          },
        }}
        disabled={app.requestStates.delete.status === 'pending'}
      >
        <div>
          <Loading spinning={app.requestStates.delete.status === 'pending'}>
            <StyledActionItem gap={6} className="delete" align="center">
              <IconTrash size={13} stroke={2} />
              {t('Delete')}
            </StyledActionItem>
          </Loading>
        </div>
      </Popconfirm>
    </Flex>
  );
});

export default PopoverContent;
