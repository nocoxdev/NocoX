import type { Rect } from '@/types';

export function getClosestEl(
  el: Element | undefined | null,
  selector: string,
  inCludeSelf = true,
): Element | null {
  return el
    ? inCludeSelf
      ? el.closest(selector)
      : el?.parentElement?.closest(selector) || null
    : null;
}

export function getElBoundingClientRect(
  el: Element | undefined | null,
): Rect | null {
  return el ? el.getBoundingClientRect() : null;
}
