import type { CSSProperties, Ref } from 'react';
import React, { Fragment, useEffect, useImperativeHandle, useRef } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface SimpleSortableItemItemProps {
  id: UniqueIdentifier;
  style?: CSSProperties;
  onRemove?: (index: number, id: UniqueIdentifier) => void;
  onDraggingChange?: (dragging: boolean) => void;
  children: (
    draggableProps: any,
    handleProps: any,
    dragging: boolean,
    sorting: boolean,
  ) => React.ReactNode;
  ref?: Ref<HTMLDivElement>;
}

const SimpleSortableItem = ({ ref, ...props }: SimpleSortableItemItemProps) => {
  const { id, style, children, onDraggingChange } = props;

  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isSorting,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({
    id,
    animateLayoutChanges: defaultAnimateLayoutChanges,
  });

  const internalRef = useRef<HTMLDivElement | null>(null);

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : undefined,
  };

  useEffect(() => {
    document.body.style.cursor = isDragging ? 'grabbing' : 'default';
    onDraggingChange?.(isDragging);
  }, [isDragging]);

  useImperativeHandle(ref, () => internalRef.current!);

  const draggableProps = {
    ref: (ref: any) => {
      internalRef.current = ref;
      setNodeRef(ref);
    },
    style: {
      ...sortableStyle,
      ...style,
    },
    ...attributes,
  };

  const handleProps = {
    ref: (ref: any) => setActivatorNodeRef(ref),
    ...listeners,
  };

  return (
    <Fragment>
      {children(draggableProps, handleProps, isDragging, isSorting)}
    </Fragment>
  );
};

export default SimpleSortableItem;
