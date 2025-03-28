import { useState } from 'react';
import {
  IconEye,
  IconEyeOff,
  IconList,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react';
import { Button, Empty, Input, Popover, Switch } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import DndSortableContext from '@/components/Sortable/DndSortableContext';
import { useCurrentSize, useCurrentTable } from '@/database/selectors';
import { useMessage } from '@/selectors';
import AddColumnPopover from '../Header/AddColumnPopover';
import type { ColumnFormValuesType } from '../Header/ColumnForm';
import { useColumnsCheck } from '../hooks';
import ColumnSortableItem from './ColumnItem';

const StyledContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colorBorderSecondary};
  align-items: center;
  height: 48px;
  padding-inline: 8px;
`;

const StyledColumns = styled.div`
  overflow-y: auto;
  padding: 8px 8px 12px 8px;
  height: 200px;
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.colorBorderSecondary};
  align-items: center;
  height: 48px;
  padding-inline: 8px;
  span {
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize}px;
  }
`;

const ColumnSettingPopover = observer(() => {
  const table = useCurrentTable();
  const { columnStore } = table;
  const size = useCurrentSize();
  const { allChecked, showAll, hideAll } = useColumnsCheck();
  const [keywords, setKeywords] = useState('');

  const message = useMessage();
  const theme = useTheme();

  const sysColumnAllHide = columnStore.sysColumns.every((item) => item.hidden);

  const handleColumnAdd = async (values: ColumnFormValuesType) => {
    const data = {
      ...values,
      order: columnStore.columns.length,
      width: 200,
    };

    const resp = await columnStore.addColumn(data);

    if (!resp.success) {
      message.error(resp.message);
    }
  };

  const content =
    columnStore.columns.length > 0 ? (
      <StyledContainer>
        <StyledHeader>
          <Input
            variant="borderless"
            placeholder={t('Search column')}
            size={size}
            allowClear
            prefix={<IconSearch size={14} color={theme.colorPrimaryText} />}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <Switch
            checked={allChecked}
            onChange={(checked) => (checked ? showAll() : hideAll())}
            size="small"
          />
        </StyledHeader>
        <StyledColumns>
          <DndSortableContext
            activationConstraint={{ distance: 8, delay: 30, tolerance: 5 }}
            items={columnStore.columns.map((item) => item.id)}
            style={{ gap: 4, marginTop: 4 }}
            onSortComplete={(activeId, _, __, to) =>
              columnStore.reorderColumn(activeId, to)
            }
          >
            {columnStore.columns
              .filter((item) =>
                item.title.toLowerCase().includes(keywords.toLowerCase()),
              )
              .map((item) => (
                <ColumnSortableItem
                  key={item.id}
                  column={item}
                  onCheck={() =>
                    item.hidden
                      ? columnStore.showColumns([item.id])
                      : columnStore.hideColumns([item.id])
                  }
                />
              ))}
          </DndSortableContext>
        </StyledColumns>
        <StyledFooter>
          <Button
            type="text"
            size={size}
            // style={{ width: 150 }}
            onClick={() => {
              const sysColumnIds = columnStore.sysColumns.map(
                (item) => item.id,
              );
              sysColumnAllHide
                ? columnStore.showColumns(sysColumnIds)
                : columnStore.hideColumns(sysColumnIds);
            }}
          >
            {sysColumnAllHide ? (
              <IconEye color={theme.colorText} size={14} />
            ) : (
              <IconEyeOff color={theme.colorText} size={14} />
            )}
            {t('System Columns')}
          </Button>
          <AddColumnPopover
            maskClosable={true}
            placement="right"
            onSubmit={handleColumnAdd}
          >
            <Button color="primary" variant="text" size={size}>
              <IconPlus color={theme.colorPrimaryText} size={14} />
              {t('New Column')}
            </Button>
          </AddColumnPopover>
        </StyledFooter>
      </StyledContainer>
    ) : (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={t('No column')}
      />
    );

  return (
    <Popover
      content={content}
      trigger={['click']}
      placement="bottomLeft"
      arrow={false}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Button type="text" size={size}>
        <IconList stroke={2} size={14} />
        {t('Columns')}
      </Button>
    </Popover>
  );
});

export default ColumnSettingPopover;
