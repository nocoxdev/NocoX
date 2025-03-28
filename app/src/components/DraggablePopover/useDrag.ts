import { useRef } from 'react';
import type { Noop, Offset, Position } from '@/types';
import { on } from '@/utils/helpers/event';
import { rootClassName } from './constants';

export function useDrag(move: (position: Position) => void) {
  const draggingRef = useRef(false);
  const mouseStartPositionRef = useRef({ left: 0, top: 0 });
  const popupStartPositionRef = useRef<Offset>({ left: 0, top: 0 });

  const mouseMoveOffRef = useRef<Noop>(() => {});
  const mouseUpOffRef = useRef<Noop>(() => {});

  const onDragMove = (e: MouseEvent): void => {
    if (!draggingRef.current) return;

    e.preventDefault();
    const { clientX, clientY } = e;

    const mouseMoveOffset = {
      x: clientX - mouseStartPositionRef.current.left,
      y: clientY - mouseStartPositionRef.current.top,
    };

    move({
      x: popupStartPositionRef.current.left + mouseMoveOffset.x,
      y: popupStartPositionRef.current.top + mouseMoveOffset.y,
    });
  };

  const onDragEnd = () => {
    mouseMoveOffRef.current?.();
    mouseUpOffRef.current?.();
    draggingRef.current = false;
  };

  const onDragStart = (e: MouseEvent) => {
    if (e.button !== 0) return;
    const { clientX, clientY, target } = e;
    const element = target as HTMLElement;
    const rootElemnet = element.closest(`.${rootClassName}`);

    if (!rootElemnet) return;

    const rootElementStyle = getComputedStyle(rootElemnet);

    popupStartPositionRef.current = {
      left: parseInt(rootElementStyle.left),
      top: parseInt(rootElementStyle.top),
    };

    mouseStartPositionRef.current = { left: clientX, top: clientY };
    draggingRef.current = true;

    mouseMoveOffRef.current = on('mousemove', onDragMove, document);
    mouseUpOffRef.current = on('mouseup', onDragEnd, document);
  };

  return { start: onDragStart };
}
