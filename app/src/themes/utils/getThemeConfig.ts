import * as common from '../common';

export function getThemeConfig(theme: string) {
  return { ...common, type: theme };
}
