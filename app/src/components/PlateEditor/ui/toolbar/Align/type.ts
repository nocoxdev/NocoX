import type { ComponentType } from 'react';
import type { Alignment } from '@udecode/plate-alignment';

export interface RadioType {
  alignment: Alignment;
  icon: ComponentType<any>;
}
