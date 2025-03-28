import { SearchOutlined } from '@ant-design/icons';
import { IconRefresh } from '@tabler/icons-react';
import { Button, Divider, Flex, Input, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import DataFilter from '@/components/DataFilter';
import DataSort from '@/components/DataSort';
import { useCurrentSize, useCurrentTable } from '@/database/selectors';
import { UiType } from '@/types';
import ColumnSettingPopover from './ColumnSettingPopover';
import { RowHeight } from './RowHeight';

const StyledContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  height: 42px;
  padding-inline: 16px;
  background-color: #fff;

  button {
    font-weight: 500;
    color: ${({ theme }) => theme.colorText};
  }
`;

const Toolbar = observer(() => {
  const table = useCurrentTable();
  const { recordStore, columnStore } = table;
  const size = useCurrentSize();
  const theme = useTheme();

  const dataColumns = columnStore.columns
    .filter(
      (item) =>
        ![UiType.Attachment, UiType.Image, UiType.Relation].includes(
          item.uiType,
        ),
    )
    .map((item) => ({
      name: item.columnName,
      valueType: item.uiType,
      title: item.title,
    }));

  return (
    <StyledContainer>
      <Flex gap={4} align="center">
        <ColumnSettingPopover />
        <Divider type="vertical" style={{ marginInline: 4 }} />
        <DataFilter
          size={size}
          fields={dataColumns}
          value={recordStore.queryParams.filter}
          onChange={(info) => {
            recordStore.setQueryParams({ filter: info });
            recordStore.loadRecords();
          }}
          bg="white"
          maskClosable
        />
        <DataSort
          onChange={(info) => {
            recordStore.setQueryParams({ sorts: info });
            recordStore.loadRecords();
          }}
          bg="white"
          value={recordStore.queryParams.sorts}
          fields={dataColumns}
          size={size}
          maskClosable
        />
        <Divider type="vertical" style={{ marginInline: 4 }} />
        <RowHeight
          value={table.rowHeight}
          onChange={(height) => table.setRowHeight(height)}
        />
        <Divider type="vertical" style={{ marginInline: 4 }} />
        <Tooltip title={t('Refresh')}>
          <Button
            onClick={async () => {
              await table.columnStore.loadColumns();
              await table.recordStore.loadRecords();
            }}
            type="text"
            size={size}
          >
            <IconRefresh stroke={2} size={14} />
          </Button>
        </Tooltip>
      </Flex>
      <Input
        placeholder=""
        allowClear
        suffix={
          <SearchOutlined
            style={{ color: theme.colorTextTertiary, cursor: 'pointer' }}
          />
        }
        style={{ width: 200 }}
        size={size}
        variant="filled"
      />
    </StyledContainer>
  );
});

export default Toolbar;
