import { useApp } from './useApp';

export function useAppRunningMode() {
  const app = useApp();

  return app.mode;
}
