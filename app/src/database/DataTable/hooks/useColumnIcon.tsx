import type { UiType } from '@/types';
import { configs } from '../configs';

export function useColumnIcon(uiType: UiType) {
  const { icon } = configs.find((item) => item.type === uiType) || {};
  return icon;
}
