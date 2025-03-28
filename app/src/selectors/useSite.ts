import { use } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

export function useSite() {
  const { site } = use(GlobalContext);

  return site;
}
