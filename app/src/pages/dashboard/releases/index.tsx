import { Fragment, useState } from 'react';
import { MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Flex, Input, Popconfirm, Tag } from 'antd';
import { t } from 'i18next';
import { useTheme } from 'styled-components';
import logo from '@/assets/logo.svg';
import DataFilter from '@/components/DataFilter';
import DataSort from '@/components/DataSort';
import ImageView from '@/components/ImageView';
import { useMessage } from '@/selectors';
import { AppReleaseApi } from '@/services/api';
import type { AppReleaseResponse } from '@/services/responses';
import type { IDataField } from '@/types';
import { UiType } from '@/types';
import { formatDate } from '@/utils/helpers';
import { useQueryPageListParams } from '@/utils/hooks';
import { StyledContentContainer, StyledToolbar } from '../../common/styled';
import EditModal from './EditModal';
import RollbackModal from './RollbackModal';

const Releases = () => {
  const theme = useTheme();
  const message = useMessage();
  const [editingId, setEditingId] = useState<string>('');
  const [rollbackId, setRollbackId] = useState<string>('');
  const [queries, setQueries] = useQueryPageListParams();
  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(async () => AppReleaseApi.getPageList(queries), {
    refreshDeps: [queries],
    onSuccess: (res) => {
      if (!res.success) {
        message.error(res.message);
      }
    },
  });
  const handleDelete = async (id: string) => {
    const resp = await AppReleaseApi.delete(id);

    if (resp.success) {
      message.success(t('Delete success'));
      runAsync();
    } else {
      message.error(resp.message);
    }
  };

  const columns: ProColumns<AppReleaseResponse>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: t('Favicon'),
      dataIndex: 'favicon',
      key: 'favicon',
      render: (_, record) => {
        const style = {
          height: 32,
          width: 'auto',
          borderRadius: theme.borderRadius,
        };

        return (
          <a>
            {(record.favicon && (
              <ImageView id={record.favicon} simple style={style} />
            )) || <img src={logo} width="100%" height="100%" style={style} />}
          </a>
        );
      },
    },
    {
      title: t('Title'),
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a href={`/app/${record.appId}`} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: t('Version'),
      dataIndex: 'version',
      key: 'version',
      render: (text) => <a>{text}</a>,
    },

    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('Online Time'),
      dataIndex: 'onlineTime',
      key: 'onlineTime',
      render: (_, record) => (
        <span>{formatDate(record.onlineTime, 'YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: t('Offline Time'),
      dataIndex: 'offlineTime',
      key: 'offlineTime',
      render: (_, record) => (
        <span>{formatDate(record.offlineTime, 'YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'offline',
      key: 'offline',
      render: (_, record) => (
        <Fragment>
          {record.offline ? (
            <Tag icon={<MinusCircleOutlined />}>{t('Offlining')}</Tag>
          ) : (
            <Tag icon={<SyncOutlined spin />} color="processing">
              {t('Running')}
            </Tag>
          )}
        </Fragment>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Flex gap={12}>
          <a href={`/app/${record.appId}`} target="_blank">
            {t('Run')}
          </a>
          <a onClick={() => setEditingId(record.id)}>{t('Edit')}</a>

          <a
            style={{ color: theme.colorWarningText, cursor: 'pointer' }}
            onClick={() => setRollbackId(record.appId)}
          >
            {t('Rollback')}
          </a>

          <Popconfirm
            title={t('Delete the release')}
            description={t('Are you sure to delete this release?')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('Yes')}
            cancelText={t('No')}
            okButtonProps={{ size: 'small' }}
            cancelButtonProps={{ size: 'small' }}
          >
            <span style={{ color: theme.colorErrorText, cursor: 'pointer' }}>
              {t('Delete')}
            </span>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const fileds: IDataField[] = [
    {
      name: 'title',
      title: t('Title'),
      valueType: UiType.LongText,
    },
    {
      name: 'version',
      title: t('Version'),
      valueType: UiType.LongText,
    },
    {
      name: 'description',
      title: t('Description'),
      valueType: UiType.LongText,
    },
    {
      name: 'onlineTime',
      title: t('Online Time'),
      valueType: UiType.DateTime,
    },
    {
      name: 'offlineTime',
      title: t('Offline Time'),
      valueType: UiType.DateTime,
    },
    {
      name: 'offline',
      title: t('Status'),
      valueType: UiType.Bool,
    },
  ];

  return (
    <StyledContentContainer>
      <StyledToolbar>
        <Flex gap={4}>
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
            placeholder={t('Please input keywords')}
            allowClear
            onSearch={(v) => setQueries({ pageIndex: 1, keywords: v })}
            onPressEnter={() => setQueries({ pageIndex: 1 })}
            style={{ width: 300 }}
          />
        </Flex>
      </StyledToolbar>
      <ProTable
        size="small"
        bordered={false}
        loading={loading}
        dataSource={resp?.data?.items}
        pagination={{
          current: queries.pageIndex,
          size: 'small',
          hideOnSinglePage: false,
          pageSize: queries.pageSize,
          showSizeChanger: true,
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

      <EditModal
        key={editingId}
        open={!!editingId}
        id={editingId}
        onClose={() => setEditingId('')}
        onOk={() => {
          setEditingId('');
          runAsync();
        }}
      />
      {rollbackId && (
        <RollbackModal
          destroyOnHidden
          id={rollbackId}
          open={!!rollbackId}
          onClose={() => setRollbackId('')}
          onOk={() => {
            setRollbackId('');
            runAsync();
          }}
        />
      )}
    </StyledContentContainer>
  );
};

export default Releases;
