import { useRef } from 'react';
import { useEventListener } from 'ahooks';
import type { Noop, Position } from '@/types';
import { getClosestEl } from '@/utils/helpers';
import { on } from '@/utils/helpers/event';
import { WIDGET_CAN_DRAG_SELECTOR } from '../constants';
import { isDragHandleEl, isDragNodeEl } from '../utils';

export function usePrependDndListener(
  callback: (e: MouseEvent) => void,
  threshold: number = 5,
  target?: Element | Document,
) {
  const startPositionRef = useRef<Position>({ x: 0, y: 0 });
  const startElementRef = useRef<Element | null>(null);
  const moveOffRef = useRef<Noop>(() => {});
  const upOffRef = useRef<Noop>(() => {});

  const reset = () => {
    moveOffRef.current?.();
    upOffRef.current?.();
    startPositionRef.current = { x: 0, y: 0 };
  };

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    const offsetX = Math.abs(clientX - startPositionRef.current.x);
    const offsetY = Math.abs(clientY - startPositionRef.current.y);
    const moveDistance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

    const widget = getClosestEl(e.target as Element, WIDGET_CAN_DRAG_SELECTOR);

    if (moveDistance >= threshold && widget === startElementRef.current) {
      reset();
      callback(e);
    }
  };

  const onMouseUp = () => reset();

  const onMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return;

    if (
      !isDragNodeEl(e.target as Element) &&
      !isDragHandleEl(e.target as Element)
    ) {
      return;
    }

    const widget = getClosestEl(e.target as Element, WIDGET_CAN_DRAG_SELECTOR);

    startElementRef.current = widget;

    const { clientX, clientY } = e;
    startPositionRef.current = { x: clientX, y: clientY };

    moveOffRef.current = on('mousemove', onMouseMove, document);
    upOffRef.current = on('mouseup', onMouseUp, document);
  };

  useEventListener('mousedown', onMouseDown, { target: target || document });
}
