import { use } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

export function useModal() {
  const { modal } = use(GlobalContext);

  return modal;
}
