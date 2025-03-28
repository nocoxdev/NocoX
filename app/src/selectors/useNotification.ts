import { use } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

export function useNotification() {
  const { notification } = use(GlobalContext);

  return notification;
}
