import type { PageNode } from '@/editor/stores';
import type { NodeEventAction } from './node';

export interface EventArgs {
  node: PageNode;
  action: NodeEventAction;
  data?: Record<string, any>;
  params?: Record<string, any>;
  e?: any[];
}
