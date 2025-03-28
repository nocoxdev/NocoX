import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Flex, Input, Popconfirm, Tag } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import DataFilter from '@/components/DataFilter';
import DataSort from '@/components/DataSort';
import { useApp } from '@/editor/selectors';
import { useMessage } from '@/selectors';
import { HistoryApi } from '@/services/api';
import type { AppHistoryResponse } from '@/services/responses';
import type { IDataField } from '@/types';
import { UiType } from '@/types';
import { formatDate } from '@/utils/helpers';
import { useQueryPageListParams } from '@/utils/hooks';
import AddBackupModal from './AddBackupModal';
import EditHistoryCommentModal from './EditHistoryCommentModal';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
  max-height: 600px;
`;

const AppHistoryList = observer(() => {
  const app = useApp();
  const theme = useTheme();
  const message = useMessage();
  const [editRecord, setEditRecord] = useState<AppHistoryResponse>();
  const [addBackupOpen, setAddBackupOpen] = useState(false);

  const [queries, setQueries] = useQueryPageListParams();
  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(
    async () => HistoryApi.getPageList({ ...queries, appId: app.id }),
    {
      refreshDeps: [queries],
      onSuccess: (res) => {
        if (!res.success) {
          message.error(res.message);
        }
      },
    },
  );

  const handleRestore = async (id: string) => {
    const resp = await app.restore(id);
    if (resp.success) {
      message.success(t('Restore success'));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      message.error(resp.message);
    }
  };

  const columns: ProColumns<AppHistoryResponse>[] = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 48,
      valueType: 'index',
    },
    {
      title: t('Comment'),
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: t('Creator'),
      dataIndex: 'creator',
      key: 'creator',
      width: 160,
      render: (text) => <Tag color={theme.colorPrimary}>{text}</Tag>,
    },
    {
      title: t('Save Time'),
      dataIndex: 'creationTime',
      key: 'creationTime',
      width: 160,
      render: (_, record) => (
        <span style={{ color: theme.colorTextSecondary }}>
          {formatDate(record.creationTime)}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Flex gap={2}>
          <Button
            size="small"
            variant="link"
            onClick={() => setEditRecord(record)}
            color="primary"
          >
            {t('Comment')}
          </Button>
          <Popconfirm
            title={t('Are you sure to restore this version?')}
            onConfirm={() => handleRestore(record.id)}
            okButtonProps={{
              loading: app.requestStates.restore.status === 'pending',
            }}
          >
            <Button size="small" variant="link" color="orange">
              {t('Restore')}
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const fileds: IDataField[] = [
    {
      name: 'comment',
      title: t('Comment'),
      valueType: UiType.LongText,
    },
    {
      name: 'creationTime',
      title: t('Save Time'),
      valueType: UiType.DateTime,
    },
  ];

  return (
    <StyledContainer>
      <Flex gap={4} justify="space-between">
        <Flex gap={4}>
          <Button
            size="small"
            type="primary"
            onClick={() => setAddBackupOpen(true)}
            icon={<PlusOutlined />}
          >
            {t('Backup')}
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
            onChange={(sorts) => setQueries({ sorts })}
          />
        </Flex>
        <Flex gap={4}>
          <Input.Search
            size="small"
            onSearch={(v) => setQueries({ pageIndex: 1, keywords: v })}
            onPressEnter={() => setQueries({ pageIndex: 1 })}
            allowClear
            style={{ width: 300 }}
          />
        </Flex>
      </Flex>

      <ProTable
        size="small"
        columns={columns}
        rowKey="id"
        dataSource={resp?.data?.items}
        search={false}
        toolBarRender={false}
        loading={loading}
        scroll={queries.pageSize > 6 ? { y: 300 } : undefined}
        pagination={{
          current: queries.pageIndex,
          size: 'small',
          pageSize: queries.pageSize,
          pageSizeOptions: [6, 12, 24, 48],
          showSizeChanger: true,
          hideOnSinglePage: false,
          total: resp?.data?.totalCount,
          onChange: (pageIndex, pageSize) =>
            setQueries({ pageIndex, pageSize }),
          showTotal: (total) => t('Total {{total}} records', { total }),
        }}
      />

      {editRecord && (
        <EditHistoryCommentModal
          destroyOnClose
          history={editRecord}
          onOk={() => {
            setEditRecord(undefined);
            runAsync();
          }}
          open={!!editRecord}
          onClose={() => setEditRecord(undefined)}
        />
      )}
      <AddBackupModal
        appId={app.id}
        onOk={() => {
          runAsync();
        }}
        open={addBackupOpen}
        onClose={() => setAddBackupOpen(false)}
      />
    </StyledContainer>
  );
});

export default AppHistoryList;
