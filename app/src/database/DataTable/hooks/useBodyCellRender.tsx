import type { UiType } from '@/types';
import { configs } from '../configs';

export function useBodyCellRender(uiType?: UiType) {
  const { renderCell } = configs.find((item) => item.type === uiType) || {};
  return renderCell;
}
