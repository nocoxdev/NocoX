import { Fragment, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { IconCheck, IconUserPlus } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Avatar, Button, Flex, Input, Tag } from 'antd';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import DataFilter from '@/components/DataFilter';
import DataSort from '@/components/DataSort';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { StyledAvatarContainer, StyledToolbar } from '@/pages/common/styled';
import RoleSelect from '@/pages/dashboard/roles/RoleSelect';
import { useMessage } from '@/selectors';
import { WorkspaceApi } from '@/services/api';
import type { UserResponse, WorkspaceResponse } from '@/services/responses';
import { getImageUrl } from '@/services/utils';
import type { IDataField } from '@/types';
import { UiType } from '@/types';
import { useQueryPageListParams } from '@/utils/hooks';

const StyledContainer = styled.div`
  display: flex;
  height: 420px;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 24px;

  .ant-pro-table {
    .ant-pro-table-alert {
      background-color: ${({ theme }) => theme.colorFillTertiary};
      .ant-pro-table-alert-container {
        padding-block: 6px;
      }
    }
  }

  .ant-empty {
    display: flex;
    height: 200px;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledTableToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTableToolbarTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colorText};
  font-weight: 600;
`;

interface WorkspaceMemberSelectModalProps extends EnhancedModalProps {
  workspace: WorkspaceResponse;
}

const WorkspaceMemberSelectModal = (props: WorkspaceMemberSelectModalProps) => {
  const { workspace, onClose, onOk, ...restProps } = props;
  const theme = useTheme();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const message = useMessage();
  const [role, setRole] = useState<string>('');

  const [queries, setQueries] = useQueryPageListParams();
  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(
    async () =>
      WorkspaceApi.getRestMemberPageList({
        ...queries,
        id: workspace.id,
        roleId: role,
      }),
    {
      refreshDeps: [queries, role],
      onSuccess: (res) => {
        if (!res.success) {
          message.error(res.message);
        }
      },
    },
  );

  const columns: ProColumns<UserResponse>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: t('User'),
      dataIndex: 'userName',
      key: 'userName',
      width: 200,
      render: (text, record) => (
        <Flex align="center" gap={8}>
          {record.avatar ? (
            <Avatar src={getImageUrl(record.avatar)} size={22} shape="circle" />
          ) : (
            <StyledAvatarContainer $size={20}>
              {record.userName?.[0]?.toUpperCase()}
            </StyledAvatarContainer>
          )}

          <a>{text}</a>
        </Flex>
      ),
    },
    {
      title: t('Email'),
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span>{text}</span>,
    },
    {
      title: t('Roles'),
      dataIndex: 'roles',
      key: 'roles',
      render: (_, record) => {
        return record.roles.map((role) => (
          <Tag key={role.id} color={theme.colorPrimary}>
            {role.name}
          </Tag>
        ));
      },
    },
  ];

  const handleConfirm = async () => {
    if (selectedRowKeys.length === 0) {
      onClose?.();
      return;
    }

    const resp = await WorkspaceApi.addMembers({
      id: workspace.id,
      userIds: selectedRowKeys,
    });

    if (resp.success) {
      message.success(t('Add success'));
      onOk?.();
      runAsync();
    } else {
      message.error(resp.message);
    }
  };

  const fileds: IDataField[] = [
    {
      name: 'userName',
      title: t('UserName'),
      valueType: UiType.LongText,
    },
    {
      name: 'email',
      title: t('Email'),
      valueType: UiType.LongText,
    },
  ];

  return (
    <EnhancedModal
      {...restProps}
      onClose={onClose}
      width={1000}
      title={
        <Fragment>
          <IconUserPlus size={14} />
          {t('Select users')}
        </Fragment>
      }
    >
      <StyledContainer>
        <Flex vertical gap={12}>
          <StyledToolbar>
            <Flex gap={4}>
              <RoleSelect
                placeholder={t('Please select role')}
                size="small"
                style={{ width: 200 }}
                value={role}
                onChange={(value) => setRole(value)}
                allowClear
              />
              <DataFilter
                size="small"
                maskClosable
                fields={fileds}
                value={queries.filter}
                onChange={(filter) => setQueries({ filter })}
              />
              <DataSort
                size="small"
                maskClosable
                fields={fileds}
                value={queries.sorts}
                onChange={(sorts) => setQueries({ sorts })}
              />
            </Flex>
            <Flex gap={4}>
              <Input.Search
                size="small"
                allowClear
                placeholder={t('Please input keywords')}
                onSearch={(v) => setQueries({ pageIndex: 1, keywords: v })}
                onPressEnter={() => setQueries({ pageIndex: 1 })}
                style={{ width: 300 }}
              />
            </Flex>
          </StyledToolbar>

          <ProTable
            columns={columns}
            rowKey="id"
            size="small"
            toolBarRender={false}
            search={false}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedKeys) =>
                setSelectedRowKeys(selectedKeys as string[]),
            }}
            tableAlertRender={false}
            dataSource={resp?.data?.items}
            loading={loading}
            pagination={{
              current: queries.pageIndex,
              size: 'small',
              hideOnSinglePage: false,
              pageSize: queries.pageSize,
              showSizeChanger: true,
              pageSizeOptions: [6, 12, 24, 48],
              total: resp?.data?.totalCount,
              onChange: (pageIndex, pageSize) =>
                setQueries({ pageIndex, pageSize }),
              showTotal: (total) => t('Total {{total}} records', { total }),
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

export default WorkspaceMemberSelectModal;
