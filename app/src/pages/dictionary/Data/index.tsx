import { use, useRef, useState } from 'react';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Flex, Input, Popconfirm, Tag, Tooltip } from 'antd';
import { t } from 'i18next';
import { omit } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import { StyledContentContainer } from '@/components/common.styled';
import { useMessage } from '@/selectors';
import { dictionaryApi } from '@/services/api';
import type { DictionaryResponse } from '@/services/responses';
import { DictionaryContext } from '../context';
import AddModal from './AddModal';
import EditModal from './EditModal';

const DataList = observer(() => {
  const actionRef = useRef<ActionType>(null);
  const [keywords, setKeywords] = useState<string>('');
  const message = useMessage();
  const theme = useTheme();
  const [deleting, setDeleting] = useState(false);
  const [editData, setEditData] = useState<Omit<
    DictionaryResponse,
    'children'
  > | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [parentId, setParentId] = useState<string>();

  const { currentGroup } = use(DictionaryContext);

  if (!currentGroup) {
    return null;
  }

  const handleEnable = async (id: string) => {
    const resp = await dictionaryApi.enable(id);

    if (resp.success) {
      message.success(t('Enable success'));
      actionRef.current?.reload();
    } else {
      message.error(resp.message);
    }
  };

  const handleDisable = async (id: string) => {
    const resp = await dictionaryApi.disable(id);
    if (resp.success) {
      message.success(t('Disable success'));
      actionRef.current?.reload();
    } else {
      message.error(resp.message);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const resp = await dictionaryApi.delete(id);
    if (resp.success) {
      message.success(t('Delete success'));
      actionRef.current?.reload();
    } else {
      message.error(resp.message);
    }
    setDeleting(false);
  };

  const columns: ProColumns<DictionaryResponse>[] = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('OrderIndex'),
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: t('Status'),
      dataIndex: 'enabled',
      key: 'enabled',
      render: (_, record) => (
        <Tag color={record.enabled ? 'green' : 'red'}>
          {record.enabled ? 'Enabled' : 'Disabled'}
        </Tag>
      ),
    },

    {
      title: t('Action'),
      key: 'action',
      width: 160,

      render: (_, record) => (
        <Flex gap={12} align="center">
          <a
            onClick={() => {
              setParentId(record.id);
              setAddModalOpen(true);
            }}
          >
            {t('Add')}
          </a>
          <a onClick={() => setEditData(omit(record, 'children'))}>
            {t('Edit')}
          </a>
          {record.enabled ? (
            <a
              style={{ color: theme.colorWarning }}
              onClick={() => handleDisable(record.id)}
            >
              {t('Disable')}
            </a>
          ) : (
            <a
              style={{ color: theme.colorSuccess }}
              onClick={() => handleEnable(record.id)}
            >
              {t('Enable')}
            </a>
          )}
          <Popconfirm
            title={t('Delete the data')}
            description={t('Are you sure to delete this data?')}
            okText={t('Yes')}
            cancelText={t('No')}
            okButtonProps={{ size: 'small', loading: deleting }}
            cancelButtonProps={{ size: 'small' }}
            onConfirm={() => handleDelete(record.id)}
          >
            <a style={{ color: theme.colorErrorText }}>{t('Delete')}</a>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <StyledContentContainer>
      <ProTable
        actionRef={actionRef}
        request={async ({ pageSize, current }) => {
          const resp = await dictionaryApi.getPageList({
            pageIndex: current ?? 1,
            pageSize: pageSize ?? 6,
            keywords,
            groupId: currentGroup.id,
          });

          !resp.success && message.error(resp.message);

          return {
            data: resp.data?.items,
            success: resp.success,
            total: resp.data?.totalCount,
          };
        }}
        columns={columns}
        pagination={{ hideOnSinglePage: true, pageSize: 6 }}
        search={false}
        rowKey="id"
        toolbar={{
          title: t('Dictionary Data'),
          search: (
            <Input.Search
              size="small"
              placeholder={t('Please enter keywords')}
              style={{ width: 300 }}
              onChange={(e) => setKeywords(e.target.value)}
              value={keywords}
              onSearch={() => actionRef.current?.reload()}
            />
          ),
          actions: [
            <Button
              key="key"
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              style={{ width: 120 }}
              onClick={() => {
                setParentId(undefined);
                setAddModalOpen(true);
              }}
            >
              {t('New Data')}
            </Button>,
            <Tooltip title={t('Reload')} placement="top">
              <Button
                type="text"
                size="small"
                onClick={() => actionRef.current?.reload()}
                icon={<ReloadOutlined />}
              />
            </Tooltip>,
          ],
          settings: [],
        }}
      />

      <AddModal
        groupId={currentGroup.id}
        parentId={parentId}
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onOk={() => {
          setAddModalOpen(false);
          actionRef.current?.reload();
        }}
      />
      {editData && (
        <EditModal
          key={editData?.id}
          initialValues={editData}
          open={!!editData}
          onOk={() => {
            setEditData(null);
            actionRef.current?.reload();
          }}
          onClose={() => setEditData(null)}
        />
      )}
    </StyledContentContainer>
  );
});
export default DataList;
