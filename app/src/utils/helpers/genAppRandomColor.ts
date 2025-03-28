import { COLORS as APP_COLORS } from '@/constants';

export function genAppRandomColor() {
  return APP_COLORS[Math.floor(Math.random() * APP_COLORS.length)];
}
