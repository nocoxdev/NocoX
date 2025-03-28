import { IconUpload } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Button, Flex, Input, Pagination, Skeleton, Upload } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import DataFilter from '@/components/DataFilter';
import DataSort from '@/components/DataSort';
import { useMessage } from '@/selectors';
import { ResourceApi } from '@/services/api';
import type { IDataField } from '@/types';
import { UiType } from '@/types';
import { usePost, useQueryPageListParams } from '@/utils/hooks';
import { StyledToolbar } from '../styled';
import ResourceCard from './Card';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledCardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

interface ResourceListProps {
  onSelect?: (id: string) => void;
}

const ResourceList = observer((props: ResourceListProps) => {
  const { onSelect } = props;
  const [queries, setQueries] = useQueryPageListParams();
  const message = useMessage();
  const { submitting, postAsync } = usePost(ResourceApi.upload);

  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(async () => ResourceApi.getPageList(queries), {
    refreshDeps: [queries],
    onSuccess: (res) => {
      if (!res.success) {
        message.error(res.message);
      }
    },
  });

  const fileds: IDataField[] = [
    {
      name: 'name',
      title: t('Name'),
      valueType: UiType.LongText,
    },
    {
      name: 'extension',
      title: t('Extension Name'),
      valueType: UiType.SingleText,
    },
    {
      name: 'creationTime',
      title: t('Creation Time'),
      valueType: UiType.DateTime,
    },
  ];

  const handleUpload = async (file: any) => {
    const resp = await postAsync(file);
    if (resp.success) {
      message.success(t('Upload success'));
      await runAsync();
    } else {
      message.error(resp.message);
    }
  };

  return (
    <StyledContainer>
      <StyledToolbar>
        <Flex gap={4}>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleUpload(file);
              return false;
            }}
            disabled={submitting}
          >
            <Button
              type="primary"
              style={{ width: 88 }}
              size="small"
              loading={submitting}
            >
              <Flex align="center" gap={4}>
                <IconUpload size={12} />
                <span style={{ fontSize: 11 }}> {t('Upload')}</span>
              </Flex>
            </Button>
          </Upload>

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
            placeholder={t('Input keywords to search')}
            style={{ width: 300 }}
            allowClear
            size="small"
            onSearch={(v) => setQueries({ pageIndex: 1, keywords: v })}
            onPressEnter={() => setQueries({ pageIndex: 1 })}
          />
        </Flex>
      </StyledToolbar>
      <Flex vertical gap={24}>
        <Skeleton active loading={loading}>
          <StyledCardListContainer className="resource-card-list">
            {resp?.data?.items?.map((item) => (
              <ResourceCard
                key={item.id}
                {...item}
                onSelect={onSelect}
                onDeleteSuccess={() => runAsync()}
              />
            ))}
          </StyledCardListContainer>
          <Flex justify="flex-end">
            <Pagination
              current={queries.pageIndex}
              size="small"
              pageSize={queries.pageSize}
              total={resp?.data?.totalCount}
              showTotal={(total) => t('Total {{total}} items', { total })}
              onChange={(pageIndex, pageSize) =>
                setQueries({ pageIndex, pageSize })
              }
              hideOnSinglePage
            />
          </Flex>
        </Skeleton>
      </Flex>
    </StyledContainer>
  );
});

export default ResourceList;
