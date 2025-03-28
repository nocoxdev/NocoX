import { useCanvas } from './useCanvas';

export function useDnd() {
  const { dnd } = useCanvas();
  return dnd;
}
