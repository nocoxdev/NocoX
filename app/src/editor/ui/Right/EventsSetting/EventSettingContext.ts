import { createContext } from 'react';
import type { ActionConfig } from '@/editor/actions/type';
import type { PageNode } from '@/editor/stores';

export interface EventSettingContextType {
  configs: ActionConfig[];
  node: PageNode;
}

export const EventSettingContext = createContext<EventSettingContextType>(
  {} as any,
);
