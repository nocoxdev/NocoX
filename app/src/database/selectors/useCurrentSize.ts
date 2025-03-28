import { use } from 'react';
import { DatabaseContext } from '../DatabaseContext';

export function useCurrentSize() {
  const context = use(DatabaseContext);
  return context.size;
}
