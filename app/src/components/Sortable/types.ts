import type { ReactNode } from 'react';
import type React from 'react';

export interface SortableItemType {
  id: string;
  remove?: { icon: React.ReactNode } | boolean;
  content?: ReactNode | ((handleProps: any) => ReactNode);
  showDragHandle?: boolean;
  style?:
    | React.CSSProperties
    | ((dragging: boolean, sorting: boolean) => React.CSSProperties);
}
