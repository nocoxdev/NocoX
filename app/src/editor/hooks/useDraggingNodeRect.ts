import { useMemo } from 'react';
import { useDnd } from '../selectors';
import { getElByNodeId } from '../utils';

export const useDraggingNodeRect = () => {
  const { dragData } = useDnd();

  const rect = useMemo(() => {
    const el = dragData?.dragId && getElByNodeId(dragData.dragId);

    if (!el) return;

    return el?.getBoundingClientRect();
  }, [dragData]);

  return rect;
};
