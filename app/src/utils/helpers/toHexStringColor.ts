import type { Color } from 'antd/es/color-picker';
import { isString } from 'lodash-es';

function toHexStringColor(color: Color | string) {
  return isString(color) ? color : color.toHexString();
}

export { toHexStringColor };
