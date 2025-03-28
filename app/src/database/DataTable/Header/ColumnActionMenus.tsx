import {
  IconPencil,
  IconSortAscending,
  IconSortDescending,
  IconTrash,
} from '@tabler/icons-react';
import { Divider, Popover } from 'antd';
import classNames from 'classnames';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import { SortOrder } from '@/components/DataSort/type';
import { useCurrentTable } from '@/database/selectors';
import type { TableColumnResponse } from '@/services/responses';
import { generateKey } from '@/utils/helpers';

const StyledContainer = styled.div`
  display: flex;
  width: 180px;
  flex-direction: column;
`;

const StyledActionItem = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  transition: background-color 0.2s;
  padding-inline: 6px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colorTextSecondary};
  gap: 8px;
  margin-block: 2px;
  user-select: none;
  font-size: 12px;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colorFillTertiary};
  }

  &.danger {
    color: ${({ theme }) => theme.colorErrorText};
    &:hover {
      background-color: ${({ theme }) => theme.colorErrorBgActive};
    }
  }

  &.disabled {
    color: ${({ theme }) => theme.colorTextDisabled};
    &:hover {
      background-color: transparent;
      cursor: not-allowed;
    }
  }
`;

interface ColumnDropdownMenusProps {
  column?: TableColumnResponse;
  open?: boolean;
  children?: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}

const ColumnDropdownMenus = observer((props: ColumnDropdownMenusProps) => {
  const { column, open, children, onEdit, onDelete } = props;
  const theme = useTheme();

  const isSystem = column?.system;
  const isKey = column?.primaryKey;
  const table = useCurrentTable();

  const handleSort = (order: SortOrder) => {
    const name = column?.columnName;
    if (!name) {
      return;
    }

    const sorts =
      table?.recordStore.queryParams.sorts?.filter(
        (item) => item.name !== name,
      ) || [];

    table?.recordStore.setQueryParams({
      sorts: [
        {
          key: generateKey(),
          name,
          order,
        },
        ...sorts,
      ],
    });

    table?.recordStore.loadRecords();
  };

  const content = (
    <StyledContainer>
      <StyledActionItem
        onClick={() => !isSystem && onEdit()}
        className={classNames({ disabled: isSystem })}
      >
        <IconPencil
          size={14}
          color={isSystem ? theme.colorTextDisabled : theme.colorTextSecondary}
        />
        <span>{t('Edit column')}</span>
      </StyledActionItem>
      <Divider style={{ margin: 4 }} />
      <StyledActionItem onClick={() => handleSort(SortOrder.Ascending)}>
        <IconSortAscending size={14} color={theme.colorTextSecondary} />
        <span>{t('Ascending')}</span>
      </StyledActionItem>
      <StyledActionItem onClick={() => handleSort(SortOrder.Descending)}>
        <IconSortDescending size={14} color={theme.colorTextSecondary} />
        <span>{t('Descending')}</span>
      </StyledActionItem>
      <Divider style={{ margin: 4 }} />

      <StyledActionItem
        className={classNames('danger', { disabled: isKey })}
        onClick={() => !isKey && onDelete()}
      >
        <IconTrash
          size={14}
          color={isKey ? theme.colorTextDisabled : theme.colorError}
        />
        <span>{t('Delete')}</span>
      </StyledActionItem>
    </StyledContainer>
  );

  return (
    <Popover
      trigger={['click']}
      placement="bottomLeft"
      open={open}
      arrow={false}
      styles={{
        body: {
          padding: 8,
        },
      }}
      content={content}
    >
      <div>{children}</div>
    </Popover>
  );
});

export default ColumnDropdownMenus;
