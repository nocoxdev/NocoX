import { useEventListener } from 'ahooks';
import { getClosestEl } from '@/utils/helpers';
import { LEFT_BUTTON, NODE_ID_MARK, WIDGET_SELECTOR } from '../constants';
import { useCanvas, useCurPage, useDnd, useSelection } from '../selectors';
import { useNodeElementObserver } from './useNodeElementObserver';

export function useSelectListener(target: Element) {
  const selection = useSelection();
  const canvas = useCanvas();
  const currentPage = useCurPage();
  const dnd = useDnd();

  const onMouseClick = (e: MouseEvent) => {
    if (e.button !== LEFT_BUTTON) return;

    const nodeEl = getClosestEl(e.target as Element, WIDGET_SELECTOR);

    const regex = String.raw`${NODE_ID_MARK}([^\s]+)`;
    const nodeId = nodeEl?.className.match(regex)?.[1];

    if (nodeId) selection.select(nodeId);
  };

  useNodeElementObserver(
    selection.id,
    (rect) => {
      selection.resize(rect);
    },
    [
      selection.id,
      dnd.dragging,
      JSON.stringify(canvas.scollPosition),
      JSON.stringify(canvas.rect),
    ],
    50,
    [
      selection.id,
      currentPage?.jsonString,
      JSON.stringify(selection.node?.props.list),
      JSON.stringify(selection.node?.styles.list),
    ],
  );

  useEventListener('click', onMouseClick, { target });
}
