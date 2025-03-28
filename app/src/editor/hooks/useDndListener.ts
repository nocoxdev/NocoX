import { useRef } from 'react';
import type { Noop } from '@/types';
import { getClosestEl } from '@/utils/helpers';
import { on } from '@/utils/helpers/event';
import {
  NODE_ID_REGEX,
  WIDGET_CAN_DRAG_SELECTOR,
  WIDGET_NAME_REGEX,
  WIDGET_SELECTOR,
} from '../constants';
import { useCurPage, useDnd, useSelection, useWidgetStore } from '../selectors';
import { getElByNodeId } from '../utils';
import { usePrependDndListener } from './usePrependDndListener';

export function useDndListener(target: Element, tolerance = 4) {
  const mouseMoveOffRef = useRef<Noop>(() => {});
  const mouseUpOffRef = useRef<Noop>(() => {});

  const dnd = useDnd();
  const widgets = useWidgetStore();
  const curPage = useCurPage();
  const selection = useSelection();

  const handleDragOver = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const position = {
      x: e.clientX,
      y: e.clientY,
    };

    const targetEl = e.target as Element;
    const overNodeEl = getClosestEl(targetEl, `${WIDGET_SELECTOR}`);
    const overNodeId = overNodeEl?.className.match(NODE_ID_REGEX)?.[1];

    dnd.move({ position, overId: overNodeId });
  };

  const handleDragEnd = () => {
    dnd.drop();
    mouseMoveOffRef.current?.();
    mouseUpOffRef.current?.();
  };

  const handleDragStart = (e: MouseEvent) => {
    e.preventDefault();

    if (!curPage) return;

    const nodeEl =
      getClosestEl(e.target as Element, WIDGET_CAN_DRAG_SELECTOR) ||
      (selection.id && getElByNodeId(selection.id));

    if (!nodeEl) return;

    const name = nodeEl.className.match(WIDGET_NAME_REGEX)?.[1];

    if (!name) return;

    const nodeId = nodeEl.className.match(NODE_ID_REGEX)?.[1];
    const widget = widgets.find(name);

    if (!widget || !widget.canDrag) return;

    if (nodeId) {
      dnd.drag({ dragId: nodeId, type: 'update', name: widget.name });
    } else {
      dnd.drag({ type: 'add', name: widget.name });
    }

    mouseMoveOffRef.current = on('mousemove', handleDragOver, document);
    mouseUpOffRef.current = on('mouseup', handleDragEnd, document);
  };

  usePrependDndListener(handleDragStart, tolerance, target);
}
