import type { ReactNode } from 'react';
import React from 'react';
import type {
  DragEndEvent,
  Modifiers,
  PointerActivationConstraint,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import classNames from 'classnames';
import { isFunction } from 'lodash-es';
import { styled } from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  transition: background-color 350ms ease;
  flex-direction: column;
`;

export interface DndSortableContextProps {
  items?: string[];
  children?: ReactNode | undefined;
  dragging?: boolean;
  modifiers?: Modifiers | undefined;
  disabled?: boolean;
  activationConstraint?: PointerActivationConstraint;
  style?:
    | React.CSSProperties
    | ((dragging: boolean, sorting: boolean) => React.CSSProperties);
  className?: string;
  onSorting?: (overId?: string) => void;
  onSortComplete?: (
    activeId: string,
    overId: string,
    fromIndex: number,
    toIndex: number,
  ) => void;
  onSortingChange?: (sorting: boolean) => void;
}

const DndSortableContext = (props: DndSortableContextProps) => {
  const {
    children,
    items = [],
    style,
    className,
    dragging = false,
    disabled = false,
    modifiers = [
      restrictToVerticalAxis,
      restrictToWindowEdges,
      restrictToParentElement,
    ],
    activationConstraint,
    onSortComplete,
    onSortingChange,
    onSorting,
  } = props;
  const [sorting, setSorting] = React.useState(false);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
  );
  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item === id);

  const handleSortingChange = (sorting: boolean) => {
    setSorting(sorting);
    onSortingChange?.(sorting);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over && active.id !== over.id) {
      const fromIndex = getIndex(active.id);
      const toIndex = getIndex(over.id);
      if (fromIndex !== toIndex) {
        onSortComplete?.(
          active.id as string,
          over.id as string,
          fromIndex,
          toIndex,
        );
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={() => handleSortingChange(true)}
      onDragEnd={(event: DragEndEvent) => {
        handleDragEnd(event);
        handleSortingChange(false);
      }}
      onDragCancel={() => handleSortingChange(false)}
      onDragMove={(e) => onSorting?.(e.over?.id as string)}
      modifiers={modifiers}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
        disabled={disabled}
      >
        <StyledContainer
          className={classNames('dnd-sortable', className)}
          style={isFunction(style) ? style(dragging, sorting) : style}
        >
          {children}
        </StyledContainer>
      </SortableContext>
    </DndContext>
  );
};

export default DndSortableContext;
