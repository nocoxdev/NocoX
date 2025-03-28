import { use } from 'react';
import { DatabaseContext } from '../DatabaseContext';

export function useStore() {
  const context = use(DatabaseContext);
  return context.store;
}
