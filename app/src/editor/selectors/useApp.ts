import { use } from 'react';
import { AppEditorContext } from '../context';

export function useApp() {
  const { app } = use(AppEditorContext);
  return app;
}
