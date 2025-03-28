import { useEventListener } from 'ahooks';
import { getClosestEl } from '@/utils/helpers';
import { NODE_ID_MARK, WIDGET_SELECTOR } from '../constants';
import { useCanvas, useCurPage, useHovering } from '../selectors';
import { useNodeElementObserver } from './useNodeElementObserver';

export function useHoverListener(target: Element) {
  const hovering = useHovering();
  const canva = useCanvas();
  const currentPage = useCurPage();
  const hoveringNode = canva.hovering.node;

  const onMouseMove = (e: MouseEvent) => {
    const nodeEl = getClosestEl(e.target as Element, WIDGET_SELECTOR);
    const regex = String.raw`${NODE_ID_MARK}([^\s]+)`;
    const nodeId = nodeEl?.className.match(regex)?.[1];

    hovering.hover(nodeId);
  };

  useNodeElementObserver(
    hovering.id,
    (rect) => hovering.resize(rect),
    [canva.scollPosition, hovering.id],
    100,
    [currentPage?.jsonString, hoveringNode?.props.record],
  );

  useEventListener('mousemove', onMouseMove, { target });
}
