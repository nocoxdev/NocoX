import { CANVAS_ID } from '@/constants';
import type {
  Direction,
  DropPlacement,
  DropType,
  IndicatorPlacement,
  Position,
  Rect,
} from '@/types';
import { getClosestEl } from '@/utils/helpers';
import {
  DRAG_HANDLE_SELECTOR,
  NODE_ID_MARK,
  NODE_ID_REGEX,
  WIDGET_CAN_DROP,
  WIDGET_SELECTOR,
} from '../constants';

export function matchNodeId(el: Element) {
  return el.className.match(NODE_ID_REGEX)?.[1];
}

export function getElByNodeId(id: string, el?: Element) {
  const target = el || document.getElementById(CANVAS_ID);

  return target?.getElementsByClassName(`${NODE_ID_MARK}${id}`)?.[0];
}

export function isHidden(el: HTMLElement) {
  let element: HTMLElement | null = el;

  while (element) {
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return true;
    }
    element = element.parentElement;

    if (!element) {
      return false;
    }
  }
}

export function getIndicatorPlacement(
  position: Position,
  direction: Direction,
  rect: Rect,
): IndicatorPlacement {
  if (direction === 'vertical') {
    return position.y <= rect.top + rect.height / 2 ? 'top' : 'bottom';
  } else {
    return position.x <= rect.left + rect.width / 2 ? 'left' : 'right';
  }
}

export function getDropPlacement(
  position: Position,
  direction: Direction,
  rect: Rect,
): DropPlacement {
  if (direction === 'vertical') {
    return position.y <= rect.top + rect.height / 2 ? 'before' : 'after';
  } else {
    return position.x <= rect.left + rect.width / 2 ? 'before' : 'after';
  }
}

export function canNodeElAcceptDrop(el: Element | undefined | null) {
  return !!el?.classList.contains(WIDGET_CAN_DROP);
}

export function hasChildNodeEl(el: Element | undefined | null) {
  return !!el?.querySelector(WIDGET_SELECTOR);
}

/**
 *  1/8 of width/height is the threshold for in or out, other 7/8 is the inner area
 */
export function isOutOfZoneWhenNoChildren(el: Element, position: Position) {
  const rect = el.getBoundingClientRect();

  const isOutOfZone =
    position.x < rect.left + rect.width / 8 ||
    position.x > rect.right - rect.width / 8 ||
    position.y < rect.top + rect.height / 8 ||
    position.y > rect.bottom - rect.height / 8;

  return isOutOfZone;
}

/**
 * the point is close to the edge of parent or first/last child
 * 1/2 of offset is the threshold for edge
 */
export function isCloserToParentEdge(
  parentEl: Element,
  el: Element,
  position: Position,
  index: number,
) {
  const rect = el.getBoundingClientRect();
  const parentRect = parentEl.getBoundingClientRect();

  const isHorizontal = getElDirection(el) === 'horizontal';

  if (isHorizontal) {
    if (parentRect.left < rect.left && index === 0) {
      // 1/2 of offset is the threshold for edge
      const centerLeft = (rect.left + parentRect.left) / 2;
      return position.x < centerLeft;
    }

    if (
      parentRect.right > rect.right &&
      index === parentEl.children.length - 1
    ) {
      const centerRight = (rect.right + parentRect.right) / 2;
      return position.x > centerRight;
    }
  } else {
    if (parentRect.top < rect.top && index === 0) {
      const centerTop = (rect.top + parentRect.top) / 2;
      return position.y < centerTop;
    }

    if (
      parentRect.bottom > rect.bottom &&
      index === parentEl.children.length - 1
    ) {
      const centerBottom = (rect.bottom + parentRect.bottom) / 2;
      return position.y > centerBottom;
    }
  }
}

/**
 * query the first sibling element that matches the selector
 */
export function querySiblingFirst(el: Element, selector: string) {
  const queue = Array.from(el.children || []);
  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (currentNode?.matches(selector)) {
      return currentNode;
    }

    queue.push(...Array.from(currentNode?.children || []));
  }
}

/**
 * find the closest element of edge to the position,child or parent
 */
export function getElClosestToPosition(parentEl: Element, position: Position) {
  const children = querySiblingFirst(parentEl, WIDGET_SELECTOR)?.parentElement
    ?.children;

  if (!children) return parentEl;

  const result = Array.from(children).reduce<{
    el: Element | null;
    min: number;
    index: number;
  }>(
    (pre, childEl, index) => {
      const { left, right, top, bottom } = childEl.getBoundingClientRect();
      const isHorizontal = getElDirection(childEl) === 'horizontal';

      const distance = isHorizontal
        ? Math.min(Math.abs(position.x - left), Math.abs(position.x - right))
        : Math.min(Math.abs(position.y - top), Math.abs(position.y - bottom));

      return distance < pre.min ? { el: childEl, min: distance, index } : pre;
    },
    { el: null, min: Infinity, index: 0 },
  );

  const { el, index } = result;

  return el && isCloserToParentEdge(parentEl, el, position, index)
    ? parentEl
    : el;
}

export function getDropNodeInfo(
  el: Element,
  dragNodeId: string | undefined,
  position: Position | undefined,
  placement?: DropPlacement,
): { el?: Element; type: DropType } | undefined {
  let closestNodeEl = getClosestEl(el, WIDGET_SELECTOR);

  while (closestNodeEl) {
    const parentClosestNodeEl = getClosestEl(
      closestNodeEl?.parentElement,
      WIDGET_SELECTOR,
    );
    const canDrop = canNodeElAcceptDrop(closestNodeEl);
    const pNodeElCanDrop = canNodeElAcceptDrop(parentClosestNodeEl);

    const inSelf = !!(
      dragNodeId &&
      getClosestEl(el, `.${NODE_ID_MARK}${dragNodeId}`, canDrop ? true : false)
    );

    if (inSelf) {
      return { el: getElByNodeId(dragNodeId), type: 'side' };
    }

    if (!canDrop && !pNodeElCanDrop) {
      closestNodeEl = parentClosestNodeEl;
      continue;
    }

    // represent the parent node can drop
    if (!canDrop) {
      return { el: closestNodeEl, type: 'side' };
    }

    // represent the parent node can't drop,only the node can drop
    if (!hasChildNodeEl(closestNodeEl)) {
      if (position) {
        if (isOutOfZoneWhenNoChildren(closestNodeEl, position)) {
          closestNodeEl = parentClosestNodeEl;
          continue;
        } else {
          return {
            el: closestNodeEl,
            type: 'inner',
          };
        }
      } else {
        return {
          el: closestNodeEl,
          type: placement === 'inner' ? 'inner' : 'side',
        };
      }
    }

    // when the node has children, get the closet child node el as the drop target node
    const closestNodeElToPosition = position
      ? getElClosestToPosition(closestNodeEl, position)
      : closestNodeEl;

    if (!pNodeElCanDrop && closestNodeElToPosition === closestNodeEl) {
      closestNodeEl = parentClosestNodeEl;
      continue;
    }

    return closestNodeElToPosition
      ? { el: closestNodeElToPosition, type: 'side' }
      : undefined;
  }
}

export function compareWidthWithParentEl(el: Element, parentEl: Element) {
  const style = window.getComputedStyle(el);
  const parentStyle = window.getComputedStyle(parentEl);

  const width = parseFloat(style.width);
  const parentContentWidth =
    parseFloat(parentStyle.width) -
    parseFloat(parentStyle.paddingLeft) -
    parseFloat(parentStyle.paddingRight) -
    parseFloat(parentStyle.borderLeftWidth) -
    parseFloat(parentStyle.borderRightWidth);

  return width >= parentContentWidth ? true : false;
}

export function getElDirection(el: Element): Direction {
  if (!el.parentElement) return 'horizontal';

  const hoverElStyle = window.getComputedStyle(el);
  const hoverDisplay = hoverElStyle.display;

  const parentStyles = window.getComputedStyle(el.parentElement);
  const parentDisplay = parentStyles.display;

  if (/flex$/.test(parentDisplay)) {
    const flexDirection = parentStyles.flexDirection;
    return flexDirection === 'column' || flexDirection === 'column-reverse'
      ? 'vertical'
      : 'horizontal';
  }

  if (
    /grid$/.test(parentDisplay) ||
    /^inline/.test(hoverDisplay) ||
    /table-cell$/.test(hoverDisplay)
  ) {
    return 'horizontal';
    // return compareWidthWithParentEl(el, el.parentElement)
    //   ? 'vertical'
    //   : 'horizontal';
  } else {
    return 'vertical';
  }
}

export function isDragNodeEl(el: Element) {
  return !!getClosestEl(el, WIDGET_SELECTOR);
}

export function isDragHandleEl(el: Element) {
  return !!getClosestEl(el, DRAG_HANDLE_SELECTOR);
}

export function adjustRect(el: Element, placement: IndicatorPlacement): Rect {
  const rect = el.getBoundingClientRect();

  if (placement === 'inner') {
    return rect;
  }

  const preSlibingElRect = el.previousElementSibling?.getBoundingClientRect();
  const nextSlibingElRect = el.nextElementSibling?.getBoundingClientRect();

  switch (placement) {
    case 'top': {
      if (!preSlibingElRect || rect.top <= preSlibingElRect.bottom) {
        return rect;
      }

      const offset = (rect.top - preSlibingElRect.bottom) / 2;
      const left = Math.min(rect.left, preSlibingElRect.left);
      const right = Math.max(rect.right, preSlibingElRect.right);

      return {
        left,
        top: rect.top - offset,
        width: right - left,
        height: rect.height,
      };
    }
    case 'bottom': {
      if (!nextSlibingElRect || rect.bottom >= nextSlibingElRect.top) {
        return rect;
      }

      const offset = (nextSlibingElRect.top - rect.bottom) / 2;
      const left = Math.min(rect.left, nextSlibingElRect.left);
      const right = Math.max(rect.right, nextSlibingElRect.right);

      return {
        left,
        top: rect.top + offset,
        width: right - left,
        height: rect.height,
      };
    }
    case 'left': {
      if (!preSlibingElRect || rect.left < preSlibingElRect.right) {
        return rect;
      }

      const offset = (rect.left - preSlibingElRect.right) / 2;
      const top = Math.min(rect.top, preSlibingElRect.top);
      const bottom = Math.max(rect.bottom, preSlibingElRect.bottom);

      return {
        left: rect.left - offset,
        top,
        height: bottom - top,
        width: rect.width,
      };
    }
    case 'right': {
      if (!nextSlibingElRect || rect.right > nextSlibingElRect.left) {
        return rect;
      }

      const offset = (nextSlibingElRect.left - rect.right) / 2;
      const top = Math.min(rect.top, nextSlibingElRect.top);
      const bottom = Math.max(rect.bottom, nextSlibingElRect.bottom);

      return {
        left: rect.left + offset,
        top,
        height: bottom - top,
        width: rect.width,
      };
    }
  }
}
