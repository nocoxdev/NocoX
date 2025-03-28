import { use } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

export function useUser() {
  const { user } = use(GlobalContext);

  return user;
}
