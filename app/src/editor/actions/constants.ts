import { t } from 'i18next';
import type { MessageType, ValueLabel } from '@/types';
import type { NavigateToType } from './type';

export const NavigateToTypeOptions: ValueLabel<NavigateToType>[] = [
  { value: 'page', label: t('Page') },
  { value: 'url', label: t('URL') },
];

export const MessageTypeOptions: ValueLabel<MessageType>[] = [
  { value: 'success', label: t('Success') },
  { value: 'info', label: t('Info') },
  { value: 'warning', label: t('Warn') },
  { value: 'error', label: t('Error') },
];

export const MessageColorMap = {
  success: '#7bd554dd',
  info: '#1890ffdd',
  warning: '#ffa940dd',
  error: '#ff4d4fdd',
};
