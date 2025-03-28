import 'styled-components';
import type { ITheme } from '../types';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
