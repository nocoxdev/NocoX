import React from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import DndSortableContext from './DndSortableContext';
import SortableItem from './SortableItem';
import type { SortableItemType } from './types';

export interface SortableProps {
  size?: SizeType;
  items?: SortableItemType[];
  style?: React.CSSProperties | ((sorting: boolean) => React.CSSProperties);
  onSortComplete?: (startIndex: number, endIndex: number) => void;
  onRemove?: (index: number, id: UniqueIdentifier) => void;
}

const Sortable = (props: SortableProps) => {
  const { items = [], size, style, onSortComplete, onRemove } = props;

  return (
    <DndSortableContext
      onSortComplete={(_, __, fromIndex, toIndex) =>
        onSortComplete?.(fromIndex, toIndex)
      }
      items={items.map((item) => item.id)}
      style={style}
    >
      {items.map((item, index) => (
        <SortableItem
          key={item.id}
          index={index}
          onRemove={onRemove}
          size={size}
          {...item}
        />
      ))}
    </DndSortableContext>
  );
};

export default Sortable;
