import { useCanvas } from './useCanvas';

export function useHovering() {
  const { hovering } = useCanvas();
  return hovering;
}
