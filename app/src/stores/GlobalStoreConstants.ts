import { MessageManager, NotificationManager, Site, User } from '@/stores';
import { ModalManager } from './ModalManager';

export const user = new User();
export const site = new Site();
export const notification = new NotificationManager();
export const message = new MessageManager();
export const modal = new ModalManager();
