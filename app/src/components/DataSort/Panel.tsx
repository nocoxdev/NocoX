import { use, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { IconTrash } from '@tabler/icons-react';
import { Button, Flex } from 'antd';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import Sortable from '@/components/Sortable';
import type { SortableItemType } from '@/components/Sortable/types';
import { generateKey } from '@/utils/helpers';
import { reorder } from '@/utils/helpers/arraryHelper';
import { useControlSize } from '@/utils/hooks';
import { DataSortContext } from './DataSortContext';
import SortItem from './SortItem';
import { type ISortItem, SortOrder } from './type';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 300px;
  .drag-handle {
    justify-content: flex-start;
  }
  .drag-delete {
    justify-content: flex-end;
  }
  .dnd-sortable {
    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
    }
  }
`;

const StyledAddButton = styled.div<{ $height: number }>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize}px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colorPrimaryText};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  height: ${({ $height }) => $height}px;
  user-select: none;

  > span:first-child {
    margin-right: 4px;
  }

  &:hover {
    color: ${({ theme }) => theme.colorPrimaryTextActive};
  }
`;

interface PanelProps {
  defaultSorts: ISortItem[];
  onChange: (sorts: ISortItem[]) => void;
}

const Panel = (props: PanelProps) => {
  const { defaultSorts, onChange } = props;
  const { size, fields } = use(DataSortContext);
  const theme = useTheme();
  const [sorts, setSorts] = useState<ISortItem[]>(defaultSorts || []);
  const height = useControlSize(size);

  const availableFields = fields.filter((field) =>
    sorts.every((s) => s.name !== field.name),
  );

  const items = sorts.map<SortableItemType>((item) => ({
    id: item.key,
    handle: true,
    remove: {
      icon: <IconTrash size={14} color={theme.colorTextQuaternary} />,
    },
    style: { border: 'none', padding: 0 },
    content: (
      <SortItem
        key={item.key}
        sort={item}
        sorts={sorts}
        onChange={(sort) =>
          setSorts((pre) => pre.map((s) => (s.name === item.name ? sort : s)))
        }
      />
    ),
  }));

  const handleAddSort = () => {
    const defaultFieldName = availableFields?.[0]?.name;

    const newSort: ISortItem = {
      key: generateKey(),
      name: defaultFieldName,
      order: SortOrder.Ascending,
    };

    setSorts((pre) => [...pre, newSort]);
  };

  return (
    <StyledContainer>
      {items.length > 0 && (
        <Sortable
          size={size}
          onSortComplete={(start, end) => setSorts(reorder(sorts, start, end))}
          onRemove={(_, key) => setSorts(sorts.filter((s) => s.key !== key))}
          items={items}
          style={{ maxHeight: 300, overflow: 'auto' }}
        />
      )}

      <Flex align="center" justify="space-between">
        {sorts.length < fields.length ? (
          <StyledAddButton onClick={handleAddSort} $height={height}>
            <PlusOutlined />
            <span>{t('Add sort')}</span>
          </StyledAddButton>
        ) : (
          <div />
        )}

        <Button
          type="primary"
          size={size}
          style={{ width: 56 }}
          onClick={() => onChange(sorts)}
        >
          {t('Confirm')}
        </Button>
      </Flex>
    </StyledContainer>
  );
};

export default Panel;
