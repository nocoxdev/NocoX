import type { Rect } from '@/types';

export function ceilRect(rect: Rect | undefined): Rect | undefined {
  return (
    rect && {
      top: Math.ceil(rect.top),
      left: Math.ceil(rect.left),
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
    }
  );
}
