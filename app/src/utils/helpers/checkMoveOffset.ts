import type { Position } from '@/types';

/**
 * 计算鼠标移动是否超过预设的偏移值
 * @param original 开始位置
 * @param current 当前位置
 * @returns
 */
export function checkMoveOffset(
  original: Position,
  current: Position,
  allowOffset = 2,
): boolean {
  return (
    Math.abs(current.x - original.x) >= allowOffset ||
    Math.abs(current.y - original.y) >= allowOffset
  );
}
