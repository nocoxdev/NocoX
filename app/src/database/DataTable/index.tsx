import type { Key } from 'react';
import { useMount } from 'ahooks';
import type { TableColumnType, TableProps } from 'antd';
import { Button, Flex, Pagination, Skeleton, Table, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import AttachmentItem from '@/components/AttachmentSelect/AttachmentItem';
import ImageView from '@/components/ImageView';
import { UiType } from '@/types';
import { useCurrentSize, useCurrentTable, useRowKey } from '../selectors';
import type { Column } from '../stores';
import BodyCell from './Body/BodyCell';
import BodyRow from './Body/BodyRow';
import { CheckHeaderCellWidth, DefaultAddColumn } from './constants';
import AddRecordRow from './Footer/AddRecordRow';
import HeaderCell from './Header/HeaderCell';
import EditRecordModal from './Record/EditRecordModal';
import RecordView from './Record/RecordView';
import Toolbar from './Toolbar';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  height: 100%;
  position: relative;
`;

const StyledTableContainer = styled.div`
  overflow-x: scroll;
  position: relative;
  z-index: 1;
  height: calc(100% - 78px);

  .ant-table-wrapper {
    .ant-table-thead > tr > th {
      background-color: #f8f8f8;
      border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
      &.ant-table-cell-fix-right {
        border-left: 1px solid ${({ theme }) => theme.colorBorderSecondary};
        border-right: none;
      }
      &::before {
        display: none;
      }

      &:nth-last-child(1) {
        border-right: none;
      }
    }

    .ant-table-tbody {
      .ant-table-placeholder {
        .ant-table-cell {
          padding: 0;
          border-bottom: none;
        }
      }
      > tr {
        > th {
          color: ${({ theme }) => theme.colorTextSecondary};

          /* &.ant-table-cell-fix-right {
            border-left: 1px solid ${({ theme }) => theme.colorBorderSecondary};
          } */

          &.ant-table-cell-fix-left {
            border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
          }
          /* &:nth-last-child(2) {
          border-right: none;
        } */
        }
      }
    }

    .ant-table-summary {
      > tr {
        > td {
          padding: 0 !important;

          &:nth-last-child(1) {
            border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
          }
        }
      }
    }

    .ant-table-footer {
      padding: 0px !important;
      background-color: transparent;
    }
  }
`;

const StyledPaginationWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-inline: 8px;
  height: 36px;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  width: 100%;
  background-color: #fff;
`;

const StyledTotal = styled.span`
  color: ${({ theme }) => theme.colorTextSecondary};
  font-size: ${({ theme }) => theme.fontSize}px;
`;

export interface TableViewProps extends Omit<TableProps, 'columns' | 'size'> {}

const TableView = observer((props: TableViewProps) => {
  const rowKey = useRowKey();
  // const theme = useTheme();
  const size = useCurrentSize();
  const table = useCurrentTable();

  const { columnStore, recordStore } = table;

  useMount(async () => {
    const resp = await columnStore.loadColumns();
    if (resp.success) {
      await recordStore.loadRecords();
    }
  });

  const totalWidth =
    columnStore.columns.reduce<number>((acc, item) => {
      return acc + (item.hidden ? 0 : item.width || 200);
    }, 0) +
    CheckHeaderCellWidth +
    60;

  const renderCell = (value: any, item: Column) => {
    switch (item.uiType) {
      case UiType.Image:
        return (
          value && (
            <ImageView id={value} height={60} style={{ width: 'auto' }} />
          )
        );
      case UiType.Attachment:
        return (
          <Flex gap={4} vertical>
            {value &&
              value
                .split(',')
                .map((item: string) => (
                  <AttachmentItem key={item} id={item.trim()} download />
                ))}
          </Flex>
        );
      case UiType.Relation: {
        var data = value?.data;
        var columnName = item.info.relation?.displayColumnName;
        var tableId = item.info.relation?.tableId;

        return (
          columnName &&
          tableId && (
            <Tooltip
              title={<RecordView initialValues={data} />}
              placement="rightTop"
            >
              <Button size="small" type="link">
                {data?.[columnName]}
              </Button>
            </Tooltip>
          )
        );
      }
      default:
        return value;
    }
  };

  const tableColumns = columnStore.columns.map<TableColumnType>((item) => {
    return {
      ...item.info,
      dataIndex: item.columnName,
      width: item.width || 200,
      render: (value) => renderCell(value, item),
    };
  });

  const tableProps: TableProps = {
    ...props,
    rowKey,
    loading: recordStore.requestStates.loadList.status === 'pending',
    tableLayout: 'fixed',
    rowSelection: {
      columnWidth: CheckHeaderCellWidth,
      type: 'checkbox',
      fixed: 'left',
      selectedRowKeys: recordStore.selectedRecordKeys,
      onChange: (keys: Key[]) => {
        recordStore.setSelectedRowIds(keys as string[]);
      },
      onCell: (record: any) => ({
        record,
        selection: true,
        className: '',
      }),
    },
    components: {
      header: {
        cell: HeaderCell,
      },
      body: {
        row: BodyRow,
        cell: BodyCell,
      },
    },

    summary: () => (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>
            <AddRecordRow />
          </Table.Summary.Cell>
          <Table.Summary.Cell
            index={1}
            colSpan={columnStore.columns.filter((item) => !item.hidden).length}
          />
        </Table.Summary.Row>
      </Table.Summary>
    ),

    locale: {
      emptyText: null,
    },
    size,
    columns: tableColumns.concat(DefaultAddColumn).map((item) => ({
      ...item,
      onHeaderCell: () => ({
        column: item,
        className: '',
      }),
      onCell: (record: any, index) => ({
        index,
        record,
        column: item,
        className: '',
      }),
    })),
    pagination: false,
    onRow: (record: any, index) => ({
      index,
      record,
      className: '',
    }),
    style: {
      width: totalWidth,
    },
  };

  return (
    <StyledContainer>
      <Toolbar />
      <Skeleton
        loading={columnStore.requestStates.loadList.status === 'pending'}
        active
        style={{ padding: 8 }}
      >
        <StyledTableContainer>
          <Table {...tableProps} dataSource={recordStore.records} />
        </StyledTableContainer>
      </Skeleton>
      <StyledPaginationWrapper>
        <StyledTotal>{`${recordStore.totalCount} ${t('records')}`}</StyledTotal>
        <Pagination
          total={recordStore.totalCount}
          hideOnSinglePage
          size="small"
          current={recordStore.queryParams.pageIndex}
          onChange={(index) =>
            table.recordStore.setQueryParams({ pageIndex: index })
          }
        />
      </StyledPaginationWrapper>
      <EditRecordModal />
    </StyledContainer>
  );
});

export default TableView;
