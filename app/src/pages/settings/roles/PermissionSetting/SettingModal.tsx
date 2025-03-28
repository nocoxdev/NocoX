import { Fragment, useState } from 'react';
import { useRequest } from 'ahooks';
import { Button, Flex, Skeleton } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import ErrorMessage from '@/components/ErrorMessage';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { RoleApi } from '@/services/api';
import type { RoleResponse } from '@/services/responses';
import PermissionCheckList from './CheckList';

const StyledContent = styled.div`
  display: flex;
  min-height: 260px;
  justify-content: space-between;
  flex-direction: column;

  gap: 12px;
  .ant-checkbox-wrapper {
    span {
      user-select: none;
    }
  }
`;

interface PermissionSettingModalProps extends EnhancedModalProps {
  role: RoleResponse;
}

const PermissionSettingModal = (props: PermissionSettingModalProps) => {
  const { role, onClose, onOk, ...restProps } = props;
  const message = useMessage();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(() => RoleApi.getPermissions(role.id), {
    onSuccess: (res) => {
      setCheckedList(res?.data?.grants || []);
    },
  });

  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    setConfirming(true);
    const res = await RoleApi.setPermissions(role.id, checkedList);

    if (res.success) {
      message.success('Success');
      onOk?.();
    } else {
      message.error(res.message);
    }
    setConfirming(false);
  };

  return (
    <EnhancedModal
      {...restProps}
      onClose={onClose}
      width={1000}
      title={<Fragment>{role.name}</Fragment>}
      onErrorReset={() => runAsync()}
      contentStyle={{ paddingBottom: 24 }}
    >
      <StyledContent>
        <Skeleton active loading={loading}>
          {resp?.success ? (
            <>
              <PermissionCheckList
                onChange={(val) => setCheckedList(val)}
                groups={
                  resp?.data?.groups.map((item) => ({
                    value: item.id,
                    label: item.name,
                    options: item.permissions.map((permission) => ({
                      value: permission.id,
                      label: permission.name,
                      type: permission.type,
                    })),
                  })) || []
                }
                value={checkedList}
              />

              <Flex justify="end" gap={12}>
                <Button type="text" size="small" onClick={() => onClose?.()}>
                  {t('Cancel')}
                </Button>
                <Button
                  type="primary"
                  size="small"
                  htmlType="submit"
                  loading={confirming}
                  onClick={handleConfirm}
                  style={{ width: 100 }}
                >
                  {t('Save Changes')}
                </Button>
              </Flex>
            </>
          ) : (
            <ErrorMessage>{resp?.message}</ErrorMessage>
          )}
        </Skeleton>
      </StyledContent>
    </EnhancedModal>
  );
};

export default PermissionSettingModal;
