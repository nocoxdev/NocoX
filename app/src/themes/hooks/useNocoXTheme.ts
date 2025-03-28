import { theme as antTheme } from 'antd';
import { getThemeConfig } from '../utils';

export function useNocoXTheme(theme: string) {
  const { token } = antTheme.useToken();

  const config = getThemeConfig(theme);

  return { ...token, ...config.customToken };
}
