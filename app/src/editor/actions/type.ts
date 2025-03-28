import type { ComponentType, ReactNode } from 'react';
import type { IconProps } from '@tabler/icons-react';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { PageNode } from '@/editor/stores';
import type { EventArgs } from '@/types';

export interface ActionConfigViewProps {
  data?: Record<string, any>;
  node: PageNode;
  size?: SizeType;
  variant?: Variant;
}

export interface EventConfig {
  name: string;
  label: ReactNode;
  description?: string;
  icon?: string | ComponentType<any> | ReactNode;
  availableParams?: string[];
}

export type NavigateToType = 'page' | 'url';

export type ActionHandler = (args: EventArgs) => void;

export interface ActionConfig {
  name: string;
  type: 'widget' | 'normal';
  icon?: ComponentType<IconProps>;
  label: string;
  description?: string;
  callbacks?: EventConfig[];
  configView: ComponentType<ActionConfigViewProps>;
  handler?: ActionHandler;
  hidden?: (node: PageNode) => boolean;
}
