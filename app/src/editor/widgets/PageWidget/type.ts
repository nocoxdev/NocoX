import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { Icon, IconProps } from '@tabler/icons-react';

export type PageSizeType = 'fluid' | 'pc' | 'mobile' | 'tablet';

export interface PageSizeConfigOption {
  label: string;
  type: PageSizeType;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}
