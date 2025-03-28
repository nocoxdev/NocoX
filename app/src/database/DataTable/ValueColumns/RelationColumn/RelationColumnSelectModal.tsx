import { use, useState } from 'react';
import { IconCircleXFilled } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import type { TableColumnType } from 'antd';
import { Button, Flex, Input, Table } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useRowKey, useStore } from '@/database/selectors';
import { AppDataApi } from '@/services/api';
import { UiType } from '@/types';
import { configs } from '../../configs';
import { ValueColumnComponentContext } from '../../context';

interface RelationColumnSelectModalProps extends EnhancedModalProps {
  onSelect: (id: string) => void;
}

const RelationColumnSelectModal = observer(
  (props: RelationColumnSelectModalProps) => {
    const { onSelect, ...restProps } = props;
    const { column } = use(ValueColumnComponentContext);
    const theme = useTheme();
    const store = useStore();
    const rowKey = useRowKey();

    const [queryParams, setQueryParams] = useState({
      pageIndex: 1,
      keywords: '',
    });

    const {
      data: resp,
      loading,
      refresh,
    } = useRequest(
      () =>
        AppDataApi.getPageList({
          ...queryParams,
          pageSize: 6,
          tableId: column?.relation?.tableId!,
        }),
      {
        refreshDeps: [queryParams],
      },
    );

    const columns: TableColumnType[] =
      store.tables
        .find((item) => item.id === column?.relation?.tableId)
        ?.columnStore.columns?.filter(
          (item) =>
            ![UiType.Attachment, UiType.Image, UiType.Relation].includes(
              item.uiType,
            ),
        )
        .map((item) => {
          const config = configs.find((c) => c.type === item.uiType);
          return {
            key: item.id,
            title: item.title,
            dataIndex: item.columnName,
            hidden: item.hidden,
            width: item.width,
            render: (value, record, index) =>
              config
                ? config.renderCell(value, record, item.info, index)
                : value,
          };
        }) || [];

    const actionColumn: TableColumnType = {
      title: t('Action'),
      dataIndex: '',
      key: 'action',
      width: 50,
      render: (record) => (
        <Button
          color="primary"
          type="link"
          onClick={() => onSelect(record[rowKey])}
        >
          {t('Select')}
        </Button>
      ),
    };

    const dataSource = resp?.data?.items || [];

    const emptyText = (
      <Flex style={{ height: 100 }} align="center" justify="center">
        {resp?.success === false && !loading ? (
          <Flex gap={8} align="center">
            <IconCircleXFilled color={theme.colorErrorText} size={16} />
            {resp.message}
          </Flex>
        ) : (
          resp?.success === true && t('No Data')
        )}
      </Flex>
    );

    return (
      <EnhancedModal {...restProps} maskClosable={false}>
        <Flex vertical gap={8}>
          <Flex justify="space-between">
            <Input.Search
              style={{ width: 300 }}
              enterButton
              size="small"
              onSearch={(val) => {
                val === queryParams.keywords
                  ? refresh()
                  : setQueryParams((pre) => ({ ...pre, keywords: val }));
              }}
            />
          </Flex>
          <Table
            locale={{ emptyText }}
            loading={loading}
            showHeader={false}
            size="small"
            pagination={{
              showTotal: (total) =>
                t('Total {{count}} items', { count: total }),
              current: queryParams.pageIndex,
              pageSize: 60,
              total: resp?.data?.totalCount || 0,
              onChange: (index) =>
                setQueryParams((pre) => ({ ...pre, pageIndex: index })),
            }}
            rowKey={rowKey}
            columns={columns.concat(actionColumn)}
            dataSource={dataSource}
            style={{
              height: 400,
              borderTop: `1px solid ${theme.colorBorderSecondary}`,
            }}
          />
        </Flex>
      </EnhancedModal>
    );
  },
);

export default RelationColumnSelectModal;
