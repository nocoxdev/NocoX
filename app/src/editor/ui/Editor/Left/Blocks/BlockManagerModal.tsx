import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { IconTrash } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Button, Flex, Input, Tag } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import DataFilter from '@/components/DataFilter';
import DataSort from '@/components/DataSort';
import ImageView from '@/components/ImageView';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { StyledToolbar } from '@/pages/common/styled';
import { useMessage } from '@/selectors';
import { BlockApi } from '@/services/api';
import type { BlockResponse } from '@/services/responses';
import type { BlockType, IDataField } from '@/types';
import { UiType } from '@/types';
import { toNow } from '@/utils/helpers';
import { useQueryPageListParams } from '@/utils/hooks';

const BlockManagerModal = observer((props: EnhancedModalProps) => {
  const [queries, setQueries] = useQueryPageListParams();

  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(
    async () =>
      BlockApi.getPageList({ ...queries, type: queries.type as BlockType }),
    {
      refreshDeps: [queries],
      onSuccess: (res) => {
        if (!res.success) {
          message.error(res.message);
        }
      },
    },
  );
  const message = useMessage();
  const theme = useTheme();

  const columns: ProColumns<BlockResponse>[] = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      valueType: 'index',
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Type'),
      dataIndex: 'isPublic',
      key: 'type',
      renderText: (text) => {
        return text ? t('Public') : t('Personal');
      },
    },
    {
      title: t('Cover'),
      dataIndex: 'cover',
      key: 'cover',
      renderText: (text) => {
        return <ImageView id={text} preview={true} width={200} height={100} />;
      },
    },
    {
      title: t('Tags'),
      dataIndex: 'tags',
      key: 'tags',
      renderText: (text) => {
        return (
          <Flex gap={2}>
            {text?.split(' ').map((tag: string) => (
              <Tag key={tag} color={theme.colorPrimary}>
                {tag}
              </Tag>
            ))}
          </Flex>
        );
      },
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('CreationTime'),
      dataIndex: 'creationTime',
      key: 'creationTime',
      renderText: (value) => toNow(value),
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (_, record) => (
        <Flex gap={2}>
          <Button
            size="small"
            type="text"
            danger
            icon={<AntdIcon content={IconTrash} size={14} />}
            onClick={() => handleDelete(record.id)}
          />
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
      name: 'tags',
      title: t('Tags'),
      valueType: UiType.LongText,
    },
    {
      name: 'isPublic',
      title: t('Type'),
      valueType: UiType.Bool,
      options: [
        {
          value: true,
          label: t('Public'),
        },
        {
          value: false,
          label: t('Personal'),
        },
      ],
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

  const handleDelete = async (id: string) => {
    const resp = await BlockApi.delete(id);
    if (resp.success) {
      message.success(t('Delete block success'));
      runAsync();
    } else {
      message.error(resp.message || t('Delete block failed'));
    }
  };

  return (
    <EnhancedModal title={t('Block management')} {...props} width={1200}>
      <Flex vertical gap={12}>
        <StyledToolbar>
          <Flex gap={4}>
            {/* <Radio.Group
              options={options}
              optionType="button"
              buttonStyle="solid"
              size="small"
              defaultValue={BlockType.All}
              onChange={(e) => {
                setQueries({ type: e.target.value as BlockType });
              }}
            /> */}
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
      </Flex>
    </EnhancedModal>
  );
});

export default BlockManagerModal;
