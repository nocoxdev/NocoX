import { Fragment, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  IconCheck,
  IconRefresh,
  IconSearch,
  IconUserPlus,
} from '@tabler/icons-react';
import { Button, Flex, Input } from 'antd';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { AppApi } from '@/services/api';
import type { RoleResponse } from '@/services/responses';
import { StyledTableToolbar, StyledTableToolbarTitle } from './styled';

const StyledContainer = styled.div`
  display: flex;
  height: 480px;
  justify-content: space-between;
  flex-direction: column;

  .ant-pro-table {
    .ant-pro-table-alert {
      background-color: ${({ theme }) => theme.colorFillTertiary};
      .ant-pro-table-alert-container {
        padding-block: 6px;
      }
    }
  }
`;

interface RoleSelectModalProps extends EnhancedModalProps {
  appId: string;
}

const RoleSelectModal = (props: RoleSelectModalProps) => {
  const { appId, onClose, onOk, ...restProps } = props;
  const theme = useTheme();
  const actionRef = useRef<ActionType>(null);
  const [keywords, setKeywords] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const message = useMessage();
  const [total, setTotal] = useState(0);

  const columns: ProColumns<RoleResponse>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
      width: 300,
      ellipsis: true,
    },
  ];

  const handleConfirm = async () => {
    if (selectedRowKeys.length === 0) {
      onClose?.();
      return;
    }

    const resp = await AppApi.addRoles({
      id: appId,
      roleIds: selectedRowKeys,
    });

    if (resp.success) {
      message.success(t('Add success'));
      onOk?.();
      actionRef.current?.reload();
    } else {
      message.error(resp.message);
    }
  };

  return (
    <EnhancedModal
      {...restProps}
      onClose={onClose}
      width={1000}
      title={
        <Fragment>
          <IconUserPlus size={14} />
          {t('Select roles')}
        </Fragment>
      }
    >
      <StyledContainer>
        <Flex vertical gap={12}>
          <StyledTableToolbar>
            <StyledTableToolbarTitle>
              {t('Rest Roles')} ({total})
            </StyledTableToolbarTitle>
            <Flex align="center" gap={12}>
              <Input
                size="small"
                placeholder={t('Please input keywords')}
                style={{ width: 300 }}
                allowClear
                // variant="filled"
                onChange={(e) => setKeywords(e.target.value)}
                value={keywords}
                onPressEnter={() => actionRef.current?.reload()}
                suffix={
                  <IconSearch
                    size={theme.fontSize}
                    stroke={1.5}
                    style={{
                      cursor: 'pointer',
                      color: theme.colorTextTertiary,
                      userSelect: 'none',
                    }}
                    onClick={() => actionRef.current?.reload()}
                  />
                }
              />
              <Button
                type="text"
                size="small"
                icon={
                  <AntdIcon
                    content={IconRefresh}
                    size={14}
                    color={theme.colorTextSecondary}
                  />
                }
                onClick={() => actionRef.current?.reload()}
              />
            </Flex>
          </StyledTableToolbar>
          <ProTable
            actionRef={actionRef}
            columns={columns}
            rowKey="id"
            pagination={false}
            size="small"
            toolBarRender={false}
            search={false}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedKeys) =>
                setSelectedRowKeys(selectedKeys as string[]),
            }}
            tableAlertRender={false}
            request={async () => {
              const resp = await AppApi.getUnGrantedRoles({
                id: appId,
                keywords,
              });

              setTotal(resp?.data?.length || 0);
              return {
                data: resp?.data,
                success: resp.success,
              };
            }}
          />
        </Flex>
        <Flex justify="end" gap={10}>
          <Button type="text" size="small" onClick={() => onClose?.()}>
            {t('Cancel')}
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={handleConfirm}
            icon={<AntdIcon content={IconCheck} size={14} />}
          >
            {t('Confirm')}
          </Button>
        </Flex>
      </StyledContainer>
    </EnhancedModal>
  );
};

export default RoleSelectModal;
