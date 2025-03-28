import type { Ref } from 'react';
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ActionType,
  ProColumns,
  ProTableProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { TablePaginationConfig, TableProps } from 'antd';
import classNames from 'classnames';
import { isUndefined, omit, omitBy } from 'lodash-es';
import { styled } from 'styled-components';
import type { IFilterInfo } from '@/components/DataFilter/type';
import type { ISortItem } from '@/components/DataSort/type';
import { NodeContext, ParamsContext } from '@/editor/context';
import { useArrayNodeProps, useNodeProps } from '@/editor/hooks';
import { useAppRunningMode } from '@/editor/selectors';
import type { WidgetActionCallbackFn } from '@/types';
import type { TableColumnProps } from './ColumnWidget/View';
import { defaultSampleData } from './constants';
import { BodyCellContext } from './context';
import { ProTableWidgetContext } from './context/ProTableWidgetContext';

const StyledWrapper = styled.div`
  display: flex;

  .ant-pro-table-list-toolbar-left {
    flex: 1;
    max-width: none;
    .ant-pro-table-list-toolbar-title {
      width: 100%;
    }
  }

  .ant-pro-table-list-toolbar-right {
    flex: none;
  }
`;

interface TableWidgetActions {
  reload: () => void;
  deleteData: (callback: WidgetActionCallbackFn) => void;
}

export interface TableWidgetProps
  extends Omit<
    ProTableProps<any, any>,
    'columns' | 'pagination' | 'toolbar' | 'request' | 'rowKey'
  > {
  borders: {
    bordered?: boolean;
    cardBordered?: boolean;
  };
  shows: {
    pagination?: boolean;
    toolbar?: boolean;
    header?: boolean;
  };
  showIndex?: boolean;

  columns: React.ReactNode;
  pagination: React.ReactNode;
  toolbar: React.ReactNode;
  columnActions: React.ReactNode;
  children?: React.ReactNode;
  rowKey?: string;
  request?: (
    params: {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sorts: ISortItem[] | undefined,
    filters: IFilterInfo[] | undefined,
  ) => Promise<any>;
  ref: Ref<TableWidgetActions>;
}

const TableWidget = ({ ref, ...props }: TableWidgetProps) => {
  const {
    style,
    className,
    rootClassName,
    columns,
    pagination,
    toolbar,
    columnActions,
    shows,
    borders,
    size,
    request,
    rowKey = 'id',
    rowSelection,
    ...restProps
  } = props;

  const mode = useAppRunningMode();

  const [primaryFilter, setPrimaryFilter] = useState<IFilterInfo>();
  const [secondaryFilter, setSecondaryFilter] = useState<IFilterInfo>();
  const [sorts, setSorts] = useState<ISortItem[]>();
  const [keywords, setKeywords] = useState<string>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const actionRef = useRef<ActionType>(null);
  const _tableColumns = useNodeProps<TableProps>(columns);

  const _columns = useArrayNodeProps<TableColumnProps<unknown>>(
    _tableColumns?.children,
    (key, _props) => ({
      key,
      dataIndex: _props.dataIndex || key,
      ...omit(omitBy(_props, isUndefined), 'className'),
      onHeaderCell: (column: TableColumnProps<unknown>) => {
        return {
          className: classNames(column.className, _props.className),
        };
      },

      onCell: () => {
        return {};
      },
      ...(_props.valueType === 'custom' && {
        render: (_: any, record: any, index: number) => {
          return (
            <NodeContext
              value={{ node: (_props as unknown as { node: any }).node }}
            >
              <BodyCellContext.Provider
                value={{
                  column: _props,
                  record,
                  index,
                }}
              >
                <ParamsContext.Provider
                  value={{ params: { dataId: record?.id } }}
                >
                  {_props.cell}
                </ParamsContext.Provider>
              </BodyCellContext.Provider>
            </NodeContext>
          );
        },
      }),
    }),
  );

  const _pagination = useNodeProps<TablePaginationConfig>(pagination);

  useImperativeHandle(ref, () => ({
    reload: () => {
      actionRef.current?.reload();
    },
    deleteData: (callback: WidgetActionCallbackFn) => {
      callback?.({ selectedIds: selectedRowKeys });
    },
  }));

  const contextValue = useMemo(
    () => ({
      rowKey,
      size,
      columns: _columns,
      filter: secondaryFilter,
      lightFilter: primaryFilter,
      sorts,
      keywords,
      setSecondaryFilter,
      setPrimaryFilter,
      setSorts,
      setKeywords,
    }),
    [size, _columns, secondaryFilter, primaryFilter, sorts, keywords, rowKey],
  );

  useEffect(() => {
    if (mode === 'edit') {
      actionRef.current?.reload();
    }
  }, [request]);

  return (
    <ProTableWidgetContext.Provider value={contextValue}>
      <ParamsContext.Provider
        value={{ params: { dataId: selectedRowKeys?.[0] } }}
      >
        <StyledWrapper className={className} style={style}>
          <ProTable
            {...restProps}
            headerTitle={toolbar}
            request={async (params) => {
              const filters = [secondaryFilter, primaryFilter].filter(
                (item) => item !== undefined,
              );
              const result = await request?.(
                { ...params, keywords },
                sorts,
                filters.length > 0 ? filters : undefined,
              );
              if (mode === 'edit') {
                let sampleData = defaultSampleData;
                if (
                  result &&
                  Array.isArray(result.data) &&
                  result.data.length > 0
                ) {
                  sampleData = [result.data[0]];
                }

                return { data: sampleData, success: true, total: 1 };
              }
              return result;
            }}
            actionRef={actionRef}
            bordered={borders.bordered}
            cardBordered={borders.cardBordered}
            showHeader={shows.header}
            className={rootClassName}
            columns={_columns as ProColumns<any, 'text'>[]}
            search={false}
            pagination={shows.pagination && _pagination}
            tableAlertRender={false}
            rowSelection={
              rowSelection && {
                ...rowSelection,
                selectedRowKeys,
                onChange: (selectedRowKeys) => {
                  setSelectedRowKeys(selectedRowKeys as string[]);
                },
              }
            }
            onHeaderRow={() => ({ className: _tableColumns?.className })}
            size={size}
            rowKey={rowKey}
            style={{ width: '100%' }}
          />
        </StyledWrapper>
      </ParamsContext.Provider>
    </ProTableWidgetContext.Provider>
  );
};

export default TableWidget;
