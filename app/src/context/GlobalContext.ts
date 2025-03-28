import { createContext } from 'react';
import type {
  MessageManager,
  ModalManager,
  NotificationManager,
  Site,
  User,
} from '@/stores';
import {
  message,
  modal,
  notification,
  site,
  user,
} from '../stores/GlobalStoreConstants';

export interface GlobalContextType {
  user: User;
  site: Site;
  notification: NotificationManager;
  message: MessageManager;
  modal: ModalManager;
}

export const GlobalContext = createContext<GlobalContextType>({} as any);

export const globalContextValue = {
  user,
  site,
  notification,
  message,
  modal,
};
