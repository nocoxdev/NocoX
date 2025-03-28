import React, { useEffect, useMemo } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconTrash } from '@tabler/icons-react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import { isFunction } from 'lodash-es';
import { styled, useTheme } from 'styled-components';
import { useControlSize } from '@/utils/hooks';
import type { SortableItemType } from './types';

const StyledSortableItemWrapper = styled.div<{ $height: number }>`
  display: flex;
  width: 100%;
  height: ${({ $height }) => $height}px;
  background-color: #fff;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colorText};
  justify-content: center;
  padding: 0px;
  border: 1px solid ${({ theme }) => theme.colorBorder};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  position: relative;

  &.handle {
    cursor: grab;
  }

  &.dragging {
    cursor: grabbing;
  }

  &.sorting:not(.dragging) {
    background-color: #fff;
  }
`;

const StyledContent = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  user-select: none;
  flex-grow: 1;
`;

const StyledDragHandle = styled.div`
  display: flex;
  width: 24px;
  height: 100%;
  align-items: center;
  cursor: grab;
  justify-content: center;
  color: ${({ theme }) => theme.colorTextTertiary};
  &.dragging {
    cursor: grabbing;
  }
`;

const StyledRemove = styled.div`
  display: flex;
  width: 24px;
  height: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colorTextTertiary};
  transition: all 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colorTextSecondary};
    svg {
      stroke: ${({ theme }) => theme.colorErrorActive};
    }
  }
`;

export interface SortableItemProps extends SortableItemType {
  size?: SizeType;
  index: number;
  onRemove?: (index: number, id: UniqueIdentifier) => void;
  onDraggingChange?: (dragging: boolean) => void;
}

const SortableItem = (props: SortableItemProps) => {
  const {
    id,
    index,
    content,
    size,
    style,
    remove,
    showDragHandle = true,
    onDraggingChange,
    onRemove,
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({
    id,
    animateLayoutChanges: defaultAnimateLayoutChanges,
  });
  const theme = useTheme();
  const height = useControlSize(size);

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : undefined,
  };

  useEffect(() => {
    document.body.style.cursor = isDragging ? 'grabbing' : 'default';
    onDraggingChange?.(isDragging);
  }, [isDragging]);

  const Content = useMemo(() => {
    // if (isDragging) return null;

    return isFunction(content)
      ? content({
          ref: setActivatorNodeRef,
          ...listeners,
        })
      : content;
  }, [isDragging, content]);

  return (
    <StyledSortableItemWrapper
      $height={height}
      ref={(ref) => setNodeRef(ref)}
      className={classNames({
        dragging: isDragging,
        sorting: isSorting,
      })}
      style={{
        ...sortableStyle,
        ...(isFunction(style) ? style(isDragging, isSorting) : style),
      }}
      {...attributes}
    >
      {showDragHandle && (
        <StyledDragHandle
          ref={setActivatorNodeRef}
          {...listeners}
          className={classNames({ dragging: isDragging, 'drag-handle': true })}
        >
          <HolderOutlined />
        </StyledDragHandle>
      )}

      <StyledContent
        {...(!showDragHandle && { ref: setActivatorNodeRef, ...listeners })}
      >
        {Content}
      </StyledContent>

      {remove && (
        <StyledRemove
          onClick={() => onRemove?.(index, id)}
          className="drag-delete"
        >
          {typeof remove !== 'boolean' ? (
            remove.icon
          ) : (
            <IconTrash stroke={1.5} size={13} color={theme.colorErrorText} />
          )}
        </StyledRemove>
      )}
    </StyledSortableItemWrapper>
  );
};

export default SortableItem;
