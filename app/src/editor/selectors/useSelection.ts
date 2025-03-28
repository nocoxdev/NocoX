import { useCanvas } from './useCanvas';

export function useSelection() {
  const { selection } = useCanvas();

  return selection;
}
