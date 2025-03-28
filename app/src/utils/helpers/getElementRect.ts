import type { Rect } from '@/types';

export function getSelectorRect(selector: string): Rect | undefined {
  const element = document.querySelector(selector);
  return element ? element.getBoundingClientRect() : undefined;
}

export function getElementRectContainMargin(
  el?: Element | null,
): Rect | undefined {
  if (!el) {
    return;
  }
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);

  const parseMargin = (margin: string) => parseInt(margin || '0');
  const marginTop = parseMargin(style.marginTop);
  const marginBottom = parseMargin(style.marginBottom);
  const marginLeft = parseMargin(style.marginLeft);
  const marginRight = parseMargin(style.marginRight);

  return {
    top: rect.top - marginTop,
    left: rect.left - marginLeft,
    width: rect.width + marginLeft + marginRight,
    height: rect.height + marginTop + marginBottom,
  };
}

export function getElementRectExcludePadding(
  el?: Element | null,
): Rect | undefined {
  if (!el) {
    return;
  }
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);

  const parsePadding = (padding: string) => parseInt(padding || '0');
  const paddingTop = parsePadding(style.paddingTop);
  const paddingBottom = parsePadding(style.paddingBottom);
  const paddingLeft = parsePadding(style.paddingLeft);
  const paddingRight = parsePadding(style.paddingRight);

  return {
    top: rect.top + paddingTop,
    left: rect.left + paddingLeft,
    width: rect.width - paddingLeft - paddingRight,
    height: rect.height - paddingTop - paddingBottom,
  };
}
