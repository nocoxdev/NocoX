import type { DependencyList } from 'react';
import { use, useEffect } from 'react';
import type { AvailableStatesType } from '@/types';
import { NodeContext } from '../context';

export function useCollectStates(
  state: AvailableStatesType,
  deps?: DependencyList,
) {
  const { node } = use(NodeContext);

  useEffect(() => {
    node.setStates(state);
  }, deps);
}
