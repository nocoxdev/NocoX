import { use } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

export function useMessage() {
  const { message } = use(GlobalContext);

  return message;
}
