import { useApp } from './useApp';

export function useWidgetStore() {
  const app = useApp();
  return app.widgetStore;
}
