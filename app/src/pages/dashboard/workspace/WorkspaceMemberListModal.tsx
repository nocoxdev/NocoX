import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { IconTrash } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Avatar, Button, Flex, Input, Popconfirm, Tag } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
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
import WorkspaceMemberSelectModal from './WorkspaceMemberSelectModal';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
  .ant-pro-table {
    .ant-pro-table-alert {
      background-color: ${({ theme }) => theme.colorFillTertiary};
      .ant-pro-table-alert-container {
        padding-block: 6px;
      }
    }
  }
`;

interface WorkspaceMemberListProps extends EnhancedModalProps {
  style?: CSSProperties;
  workspace: WorkspaceResponse;
}

const WorkspaceMemberListModal = observer((props: WorkspaceMemberListProps) => {
  const { workspace, style, onClose } = props;
  const theme = useTheme();

  const [userSelectModalOpen, setUserSelectModalOpen] = useState(false);
  const message = useMessage();
  const [role, setRole] = useState<string>('');

  const [queries, setQueries] = useQueryPageListParams();
  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(
    async () =>
      WorkspaceApi.getMemberPageList({
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
              {record.userName?.[0].toUpperCase()}
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
      render: (text) => <a>{text}</a>,
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
    {
      title: t('Action'),
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Popconfirm
          title={t('Are you sure you want to delete this user?')}
          onConfirm={async () => {
            const resp = await WorkspaceApi.deleteMembers({
              id: workspace.id,
              userIds: [record.id],
            });

            if (resp.success) {
              message.success(t('Delete success'));
              setQueries({ pageIndex: 1 });
            } else {
              message.error(resp.message);
            }
          }}
          okText={t('Yes')}
          cancelText={t('No')}
          okButtonProps={{
            danger: true,
            size: 'small',
          }}
          cancelButtonProps={{ size: 'small', type: 'text' }}
        >
          <Button
            danger
            type="text"
            size="small"
            icon={
              <AntdIcon
                content={IconTrash}
                size={14}
                color={theme.colorErrorText}
              />
            }
          />
        </Popconfirm>
      ),
    },
  ];

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
      {...props}
      onClose={onClose}
      width={1000}
      title={`${t('Members')} (${resp?.data?.totalCount || 0})`}
    >
      <StyledContainer style={style}>
        <StyledToolbar>
          <Flex gap={4}>
            <Button
              key="key"
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              style={{ width: 100 }}
              onClick={() => setUserSelectModalOpen(true)}
            >
              {t('Add members')}
            </Button>
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
          ghost={true}
          loading={loading}
          size="small"
          toolBarRender={false}
          search={false}
          tableAlertRender={false}
          dataSource={resp?.data?.items}
          pagination={{
            current: queries.pageIndex,
            size: 'small',
            pageSize: queries.pageSize,
            showSizeChanger: true,
            pageSizeOptions: [6, 12, 24, 48],
            hideOnSinglePage: false,
            total: resp?.data?.totalCount,
            onChange: (pageIndex, pageSize) =>
              setQueries({ pageIndex, pageSize }),
            showTotal: (total) => t('Total {{total}} records', { total }),
          }}
        />
        {userSelectModalOpen && (
          <WorkspaceMemberSelectModal
            workspace={workspace}
            open={userSelectModalOpen}
            onClose={() => setUserSelectModalOpen(false)}
            onOk={() => {
              setUserSelectModalOpen(false);
              runAsync();
            }}
          />
        )}
      </StyledContainer>
    </EnhancedModal>
  );
});

export default WorkspaceMemberListModal;
