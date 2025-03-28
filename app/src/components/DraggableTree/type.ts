import type { DropPlacement } from '@/types';

export interface TreeNodeData {
  key: string;
  children?: TreeNodeData[];
  title?: React.ReactNode;
  canDrag?: boolean;
  canDrop?: boolean;
  style?: React.CSSProperties;
  className?: string;
  selectable?: boolean;
  hoverable?: boolean;
  showSwitch?: boolean;
  attachedData?: Record<string, any>;
}

export type DragArgs = Pick<
  IndicatorInstruction,
  | 'dragKey'
  | 'dropKey'
  | 'placement'
  | 'dropItemConfig'
  | 'dragItemConfig'
  | 'level'
>;

export type DragEventType<T> = (args?: DragArgs) => T;

export interface IndicatorInstruction {
  dragKey: string;
  dropKey?: string;
  indicatorKey?: string;
  level?: number;
  canDrop?: boolean;
  placement?: DropPlacement;
  dragItemConfig?: Record<string, any>;
  dropItemConfig?: Record<string, any>;
}
