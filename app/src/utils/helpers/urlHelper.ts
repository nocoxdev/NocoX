import { ADMIN_BASE_URL } from '@/constants';

export function getRedirectUrl(goto: string) {
  return `${ADMIN_BASE_URL}/${goto}?redirect=${encodeURIComponent(window.location.href)}`;
}
