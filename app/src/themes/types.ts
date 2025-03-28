import type { GlobalToken } from 'antd';

export interface CustomToken {
  widthMenu?: number;
  widthDesignerLeftSidebar?: number;
  widthDesignerRightSidebar?: number;
  heightHeader?: number;
  colorSiderBg?: string;
}

export type ITheme = GlobalToken & CustomToken;
