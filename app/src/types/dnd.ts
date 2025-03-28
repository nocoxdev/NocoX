import type {
  Direction,
  DragType,
  DropPlacement,
  IndicatorPlacement,
  Position,
  Rect,
} from './common';

export interface DragData {
  dragId?: string;
  name?: string;
  type: DragType;
}

export interface DraggingInfo {
  overId?: string;
  position?: Position;
  placement?: DropPlacement;
}

export interface DropInfo {
  dropId: string;
  placement: DropPlacement;
}

export type DropType = 'side' | 'inner';

export interface Indication {
  dropId: string;
  rect: Rect;
  parentRect?: Rect;
  placement: IndicatorPlacement;
  direction: Direction;
  dropType: DropType;
  allowDrop: boolean;
}
