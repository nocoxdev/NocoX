import { use } from 'react';
import { useControlSize } from '@/utils/hooks';
import { PlateEditorContext } from '../PlateEditorContext';

export function useCurrentSize() {
  const { size } = use(PlateEditorContext);
  const height = useControlSize(size);

  return { size, height };
}
