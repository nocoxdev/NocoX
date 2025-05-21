import { theme } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider';
import type { CustomToken } from './types';

export const customToken: CustomToken = {
  widthDesignerLeftSidebar: 248,
  widthDesignerRightSidebar: 248,
  widthMenu: 248,
  heightHeader: 48,
  colorSiderBg: '#fff',
};

export const antTheme: ThemeConfig = {
  token: {
    fontSize: 12,
    borderRadius: 4,
    colorPrimary: '#566edf',
    colorSuccess: '#6bb574',
    colorError: '#ed7273',
    controlOutline: 'none',
    controlHeightSM: 28,
  },
  components: {
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },

    Modal: { titleFontSize: 13 },
    Segmented: {
      itemHoverBg: '',
      itemSelectedColor: '#0052d9',
    },
    Menu: {
      itemHeight: 28,
      itemColor: theme.getDesignToken().colorText,
      itemHoverBg: 'rgba(0, 0, 0, 0.04)',
    },
    Form: {
      itemMarginBottom: 16,
    },

    Rate: {
      starBg: 'rgba(0, 0, 0, 0.2)',
    },
    Radio: {
      paddingXS: 14,
    },

    DatePicker: {
      cellWidth: 36,
      cellHeight: 24,
    },

    Tooltip: {
      fontSize: 10,
      controlHeight: 20,
    },
    Notification: {
      width: 300,
      paddingMD: 16,
      paddingLG: 20,
    },
    Splitter: {
      splitBarSize: 2,
      controlItemBgActive: '#566edf88',
      controlItemBgActiveHover: '#566edf',
    },
  },
};
