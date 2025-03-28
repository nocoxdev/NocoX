import type { SetStateAction } from 'react';
import { createContext } from 'react';
import type { DragEventType, IndicatorInstruction, TreeNodeData } from './type';

export interface DraggableTreeContextType {
  indent: number;
  switchIcon: React.ComponentType<any>;
  expandedKeys: string[];
  uniqueContextId: Symbol;
  selectedKey?: string;
  selectable?: boolean;
  data: TreeNodeData[];
  instruction?: IndicatorInstruction;
  sorting?: boolean;
  awaitingEnter: React.RefObject<boolean>;
  rootCanDrop?: boolean;
  gap: number;
  setSorting: (v: boolean) => void;
  setWaitingEnter: (v: boolean) => void;
  setSelectedKey: (v: SetStateAction<string>) => void;
  setInstruction: (v: SetStateAction<IndicatorInstruction | undefined>) => void;
  setExpandedKeys: (v: SetStateAction<string[]>) => void;
  onDragStart?: (dragKey: string, config?: Record<string, any>) => void;
  onDragMove?: DragEventType<void>;
  onDrop?: DragEventType<void>;
  allowDrop?: DragEventType<boolean>;
}

export const DraggableTreeContext = createContext<DraggableTreeContextType>(
  {} as any,
);
