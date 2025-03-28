import { Fragment, useState } from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Flex, Input, Popconfirm, Tag } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import DataFilter from '@/components/DataFilter';
import DataSort from '@/components/DataSort';
import { useMessage } from '@/selectors';
import { RoleApi } from '@/services/api';
import type { RoleResponse } from '@/services/responses';
import { RoleStatus } from '@/services/responses';
import type { IDataField } from '@/types';
import { UiType } from '@/types';
import { formatDate } from '@/utils/helpers';
import { useQueryPageListParams } from '@/utils/hooks';
import { StyledContentContainer, StyledToolbar } from '../../common/styled';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import PermissionSettingModal from './PermissionSetting/SettingModal';

const Roles = observer(() => {
  const theme = useTheme();
  const message = useMessage();
  const [editingId, setEditingId] = useState<string>('');
  const [permissionRole, setPermissionRole] = useState<RoleResponse>();
  const [createOpen, setCreateOpen] = useState(false);
  const [queries, setQueries] = useQueryPageListParams();
  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(async () => RoleApi.getPageList(queries), {
    refreshDeps: [queries],
    onSuccess: (res) => {
      if (!res.success) {
        message.error(res.message);
      }
    },
  });
  const handleDelete = async (id: string) => {
    const resp = await RoleApi.delete(id);

    if (resp.success) {
      message.success(t('Delete role success'));
      runAsync();
    } else {
      message.error(resp.message);
    }
  };

  const handleDisable = async (id: string) => {
    const resp = await RoleApi.disable(id);
    if (resp.success) {
      message.success(t('Disable role success'));
      runAsync();
    } else {
      message.error(resp.message);
    }
  };

  const handleEnable = async (id: string) => {
    const resp = await RoleApi.enable(id);
    if (resp.success) {
      message.success(t('Enable role success'));
      runAsync();
    } else {
      message.error(resp.message);
    }
  };

  const renderStatusTag = (status: RoleStatus) => {
    switch (status) {
      case RoleStatus.Normal:
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {t('Normal')}
          </Tag>
        );
      case RoleStatus.Forbbidden:
        return (
          <Tag icon={<ClockCircleOutlined />} color="error">
            {t('Forbidden')}
          </Tag>
        );

      default:
        return null;
    }
  };

  const columns: ProColumns<RoleResponse>[] = [
    {
      dataIndex: 'index',
      width: 48,
      valueType: 'index',
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Tag color={theme.colorPrimary}>{text}</Tag>,
    },
    {
      title: t('Status'),
      dataIndex: 'isActive',
      key: 'isActive',
      render: (_, record) => (
        <Fragment>{renderStatusTag(record.status)}</Fragment>
      ),
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
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
          <a
            onClick={() => {
              setEditingId(record.id);
            }}
          >
            {t('Edit')}
          </a>

          {record.status === RoleStatus.Normal ? (
            <Popconfirm
              title={t('Disable the role')}
              description={t('Are you sure to disable this role?')}
              onConfirm={() => handleDisable(record.id)}
              okText={t('Yes')}
              cancelText={t('No')}
              okButtonProps={{ size: 'small' }}
              cancelButtonProps={{ size: 'small' }}
            >
              <a style={{ color: theme.colorWarningText }}>{t('Disable')}</a>
            </Popconfirm>
          ) : (
            <Popconfirm
              title={t('Enable the role')}
              description={t('Are you sure to enable this role?')}
              onConfirm={() => handleEnable(record.id)}
              okText={t('Yes')}
              cancelText={t('No')}
              okButtonProps={{ size: 'small' }}
              cancelButtonProps={{ size: 'small' }}
            >
              <a style={{ color: theme.colorWarningText }}>{t('Enable')}</a>
            </Popconfirm>
          )}

          <a
            style={{ color: theme.colorWarningText }}
            onClick={() => {
              setPermissionRole(record);
            }}
          >
            {t('Permissions')}
          </a>

          <Popconfirm
            title={t('Delete the role')}
            description={t('Are you sure to delete this role?')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('Yes')}
            cancelText={t('No')}
            okButtonProps={{ size: 'small' }}
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
      name: 'name',
      title: t('Name'),
      valueType: UiType.LongText,
    },
    {
      name: 'description',
      title: t('Description'),
      valueType: UiType.LongText,
    },
    {
      name: 'creationTime',
      title: t('CreationTime'),
      valueType: UiType.DateTime,
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
            {t('New Role')}
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
        size="small"
        columns={columns}
        rowKey="id"
        bordered={false}
        loading={loading}
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

      {editingId && (
        <EditModal
          key={`edit-${editingId}`}
          id={editingId}
          open={!!editingId}
          onOk={() => {
            runAsync();
            setEditingId('');
          }}
          onClose={() => {
            setEditingId('');
          }}
        />
      )}

      {permissionRole && (
        <PermissionSettingModal
          role={permissionRole}
          key={`permission-${permissionRole.id}`}
          open={!!permissionRole}
          onOk={() => {
            setPermissionRole(undefined);
          }}
          onClose={() => {
            setPermissionRole(undefined);
          }}
        />
      )}
    </StyledContentContainer>
  );
});

export default Roles;
