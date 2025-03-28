import { use } from 'react';
import { AppEditorContext } from '../context';

export function useEventManager() {
  const { app } = use(AppEditorContext);
  return app.eventManager;
}
