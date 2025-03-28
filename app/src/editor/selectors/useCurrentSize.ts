import { use } from 'react';
import { AppEditorContext } from '../context';

export function useCurrentSize() {
  const context = use(AppEditorContext);
  return context.size;
}
