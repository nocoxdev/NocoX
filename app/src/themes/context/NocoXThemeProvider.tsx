import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { useNocoXTheme } from '../hooks';

export interface NocoXThemeProviderProps {
  theme: string;
}

const NocoXThemeProvider = (
  props: PropsWithChildren<NocoXThemeProviderProps>,
) => {
  const { theme, children } = props;

  const token = useNocoXTheme(theme);

  return <ThemeProvider theme={token}>{children}</ThemeProvider>;
};

export default NocoXThemeProvider;
