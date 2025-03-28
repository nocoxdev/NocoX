import { useEffect } from 'react';
import type { DropPlacement, Indication, IndicatorPlacement } from '@/types';
import { getClosestEl } from '@/utils/helpers';
import { NODE_ID_REGEX, WIDGET_SELECTOR } from '../constants';
import { useCanvas, useDnd } from '../selectors';
import {
  adjustRect,
  getDropNodeInfo,
  getElByNodeId,
  getElDirection,
  getIndicatorPlacement,
} from '../utils';

export function useDndEffect() {
  const dnd = useDnd();
  const canvas = useCanvas();
  const { draggingInfo, position, dragData } = dnd;

  useEffect(() => {
    if (!draggingInfo?.overId || !dragData) {
      dnd.setDropInfo();
      dnd.setIndication();
      return;
    }
    const targetEl = getElByNodeId(draggingInfo.overId);

    if (!targetEl) return;
    const dropNodeInfo = getDropNodeInfo(
      targetEl,
      dragData.dragId,
      position,
      draggingInfo.placement,
    );

    const { el: dropNodeEl, type: dropType } = dropNodeInfo || {};

    const dropId = dropNodeEl?.className.match(NODE_ID_REGEX)?.[1];

    if (!dropNodeEl || !dropType || !canvas.rect || !dropId) {
      return;
    }

    const direction = getElDirection(dropNodeEl);

    let placement: IndicatorPlacement = 'inner';

    if (dropType !== 'inner') {
      if (position) {
        placement = getIndicatorPlacement(
          position,
          direction,
          dropNodeEl.getBoundingClientRect(),
        );
      } else {
        if (direction === 'vertical') {
          placement = draggingInfo.placement === 'before' ? 'top' : 'bottom';
        } else {
          placement = draggingInfo.placement === 'before' ? 'left' : 'right';
        }
      }
    }

    const dropPlacement: DropPlacement =
      placement === 'inner'
        ? 'inner'
        : placement === 'top' || placement === 'left'
          ? 'before'
          : 'after';

    dnd.setDropInfo({ dropId: dropId, placement: dropPlacement });

    const dropNodeElRect =
      dropType === 'inner'
        ? dropNodeEl?.getBoundingClientRect()
        : adjustRect(dropNodeEl, placement);

    const closestParentNodeEl = getClosestEl(
      dropNodeEl?.parentElement,
      WIDGET_SELECTOR,
    );

    const closestParentNodeElRect =
      closestParentNodeEl?.getBoundingClientRect();
    const computedLeft =
      dropNodeElRect.left -
      canvas.rect.left +
      (placement == 'right' ? dropNodeElRect.width : 0);

    const computedTop =
      dropNodeElRect.top -
      canvas.rect.top +
      (placement == 'bottom' ? dropNodeElRect.height : 0);

    const computedRect = {
      left: computedLeft,
      top: computedTop,
      width: dropNodeElRect.width,
      height: dropNodeElRect.height,
    };

    const computedParentRect = closestParentNodeElRect && {
      left: closestParentNodeElRect.left - canvas.rect.left,
      top: closestParentNodeElRect.top - canvas.rect.top,
      width: closestParentNodeElRect.width,
      height: closestParentNodeElRect.height,
    };

    const indication: Indication = {
      dropId,
      rect: computedRect,
      parentRect: computedParentRect,
      placement,
      direction,
      dropType,
      allowDrop: dnd.allowDrop,
    };

    dnd.setIndication(indication);
  }, [dragData, draggingInfo, position, canvas.rect]);

  useEffect(() => {
    if (dnd.dragging) {
      document.body.classList.add('dragging');
    } else {
      document.body.classList.remove('dragging');
    }
  }, [dnd.dragging]);
}
