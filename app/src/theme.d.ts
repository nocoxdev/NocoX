// import original module declarations
import 'styled-components';
import type { ITheme } from '@/themes/types';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
