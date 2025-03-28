import { createContext } from 'react';
import type { PageNode } from '@/editor/stores/PageNode';

interface NodeContextType {
  node: PageNode;
}

export const NodeContext = createContext<NodeContextType>({} as any);
