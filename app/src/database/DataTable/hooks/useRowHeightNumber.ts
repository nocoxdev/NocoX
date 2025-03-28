import type { TableRowHeightType } from '@/types';

export function useRowHeightNumber(type: TableRowHeightType) {
  switch (type) {
    case 'small':
      return 32;
    case 'medium':
      return 64;
    case 'large':
      return 120;
    default:
      return 32;
  }
}
