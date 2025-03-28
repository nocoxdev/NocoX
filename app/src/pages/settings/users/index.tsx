import { Fragment, useState } from 'react';
import {
  CheckCircleOutlined,
  LockOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Avatar, Button, Flex, Input, Popconfirm, Tag } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import DataFilter from '@/components/DataFilter';
import DataSort from '@/components/DataSort';
import { useMessage } from '@/selectors';
import { UserApi } from '@/services/api';
import type { UserResponse } from '@/services/responses';
import { UserStatus } from '@/services/responses';
import { getImageUrl } from '@/services/utils';
import type { IDataField } from '@/types';
import { UiType } from '@/types';
import { formatDate } from '@/utils/helpers';
import { usePost, useQueryPageListParams } from '@/utils/hooks';
import {
  StyledAvatarContainer,
  StyledContentContainer,
  StyledToolbar,
} from '../../common/styled';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import ResetPasswordModal from './ResetPasswordModal';

const Users = observer(() => {
  const theme = useTheme();
  const message = useMessage();
  const [editingId, setEditingId] = useState<string>('');
  const [resetPasswordId, setResetPasswordId] = useState<string>('');
  const [createOpen, setCreateOpen] = useState(false);
  const [queries, setQueries] = useQueryPageListParams();

  const { submitting: deleting, postAsync } = usePost(UserApi.delete);
  const { submitting: freezing, postAsync: freezeAsync } = usePost(
    UserApi.freeze,
  );
  const { submitting: unfreezing, postAsync: unfreezeAsync } = usePost(
    UserApi.unfreeze,
  );

  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(async () => UserApi.getPageList(queries), {
    refreshDeps: [queries],
    onSuccess: (res) => {
      if (!res.success) {
        message.error(res.message);
      }
    },
  });

  const handleDelete = async (id: string) => {
    const resp = await postAsync(id);

    if (resp.success) {
      message.success(t('Delete success'));
      runAsync();
    } else {
      message.error(resp.message);
    }
  };

  const handleFreeze = async (id: string) => {
    const resp = await freezeAsync(id);

    if (resp.success) {
      message.success(t('Freeze success'));
      runAsync();
    } else {
      message.error(resp.message);
    }
  };

  const handleUnfreeze = async (id: string) => {
    const resp = await unfreezeAsync(id);

    if (resp.success) {
      message.success(t('Unfreeze success'));
      runAsync();
    } else {
      message.error(resp.message);
    }
  };

  const renderStatusTag = (status: UserStatus) => {
    switch (status) {
      case UserStatus.Normal:
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {t('Normal')}
          </Tag>
        );

      case UserStatus.Frozen:
        return (
          <Tag icon={<LockOutlined />} color="error">
            {t('Frozen')}
          </Tag>
        );
      default:
        return null;
    }
  };

  const columns: ProColumns<UserResponse>[] = [
    {
      dataIndex: 'index',
      width: 48,
      valueType: 'index',
    },
    {
      title: t('Avatar'),
      dataIndex: 'avator',
      key: 'avator',
      hidden: true,
    },
    {
      title: t('UserName'),
      dataIndex: 'userName',
      key: 'userName',
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
    },
    {
      title: t('PhoneNumber'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
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
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Fragment>{renderStatusTag(record.status)}</Fragment>
      ),
    },
    {
      title: t('CreationTime'),
      dataIndex: 'creationTime',
      key: 'creationTime',
      render: (_, record) => (
        <a>{formatDate(record.creationTime, 'YYYY-MM-DD HH:mm:ss')}</a>
      ),
    },
    {
      title: t('Action'),
      key: 'action',
      render: (_, record) => (
        <Flex gap={12} align="center">
          <a onClick={() => setEditingId(record.id)}>{t('Edit')}</a>
          <a onClick={() => setResetPasswordId(record.id)}>
            {t('Reset password')}
          </a>
          {record.status === UserStatus.Normal && (
            <Popconfirm
              title={t('Freeze the user')}
              description={t('Are you sure to freeze this user?')}
              onConfirm={() => handleFreeze(record.id)}
              okText={t('Yes')}
              cancelText={t('No')}
              okButtonProps={{ size: 'small', loading: freezing }}
              cancelButtonProps={{ size: 'small' }}
            >
              <a style={{ color: theme.colorWarningText }}>{t('Freeze')}</a>
            </Popconfirm>
          )}
          {record.status === UserStatus.Frozen && (
            <Popconfirm
              title={t('Unfreeze the user')}
              description={t('Are you sure to unfreeze this user?')}
              onConfirm={() => handleUnfreeze(record.id)}
              okText={t('Yes')}
              cancelText={t('No')}
              okButtonProps={{ size: 'small', loading: unfreezing }}
              cancelButtonProps={{ size: 'small' }}
            >
              <a style={{ color: theme.colorWarningText }}>{t('Unfreeze')}</a>
            </Popconfirm>
          )}
          <Popconfirm
            title={t('Delete the user')}
            description={t('Are you sure to delete this user?')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('Yes')}
            cancelText={t('No')}
            okButtonProps={{ size: 'small', loading: deleting }}
            cancelButtonProps={{ size: 'small' }}
          >
            <a style={{ color: theme.colorErrorText }}>{t('Delete')}</a>
          </Popconfirm>
        </Flex>
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
    {
      name: 'phoneNumber',
      title: t('PhoneNumber'),
      valueType: UiType.LongText,
    },
    {
      name: 'status',
      title: t('Status'),
      valueType: UiType.Integer,
      options: [
        { label: t('Normal'), value: UserStatus.Normal },
        { label: t('Frozen'), value: UserStatus.Frozen },
      ],
    },
    {
      name: 'creationTime',
      title: t('Creation Time'),
      valueType: UiType.Date,
    },
  ];

  return (
    <StyledContentContainer>
      <StyledToolbar>
        <Flex gap={4}>
          <Button
            key="key"
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            style={{ width: 80 }}
            onClick={() => setCreateOpen(true)}
          >
            {t('New User')}
          </Button>
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
        bordered={false}
        loading={loading}
        size="small"
        dataSource={resp?.data?.items}
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
        columns={columns}
        rowKey="id"
        search={false}
        toolBarRender={false}
      />
      <CreateModal
        open={createOpen}
        onOk={() => {
          setCreateOpen(false);
          runAsync();
        }}
        destroyOnClose
        onClose={() => setCreateOpen(false)}
      />
      <EditModal
        key={`edit-${editingId}`}
        id={editingId}
        open={!!editingId}
        onOk={() => {
          setEditingId('');
          runAsync();
        }}
        onClose={() => {
          setEditingId('');
        }}
      />
      <ResetPasswordModal
        key={`reset-${resetPasswordId}`}
        id={resetPasswordId}
        open={!!resetPasswordId}
        onOk={() => {
          setResetPasswordId('');
        }}
        onClose={() => {
          setResetPasswordId('');
        }}
      />
    </StyledContentContainer>
  );
});

export default Users;
