import type { ReactNode } from 'react';
import { isString } from 'lodash-es';

/**
 * create icon component
 * @param icon
 * @returns
 */
export function createIcon(icon: string): ReactNode {
  if (!icon) {
    return null;
  }

  if (isString(icon)) {
    return <img src={icon} />;
  } else {
    return icon;
  }
}
