import { use } from 'react';
import { AppContext } from '../Apps/AppContext';

export function useCurApp() {
  const context = use(AppContext);
  return context.app;
}
