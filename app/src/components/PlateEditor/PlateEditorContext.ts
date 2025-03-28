import { createContext } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

export interface PlateEditorContextType {
  size?: SizeType;
}

export const PlateEditorContext = createContext<PlateEditorContextType>({
  size: 'middle',
});
