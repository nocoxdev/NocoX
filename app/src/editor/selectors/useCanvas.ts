import { use } from 'react';
import { AppEditorContext } from '../context';

export function useCanvas() {
  const { canvas } = use(AppEditorContext);
  return canvas;
}
