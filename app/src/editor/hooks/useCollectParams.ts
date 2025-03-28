import { use, useEffect } from 'react';
import { NodeContext } from '../context';

export function useCollectParams(params: Record<string, any>) {
  const { node } = use(NodeContext);

  useEffect(() => {
    node?.transferParams(params);
  }, [JSON.stringify(params)]);
}
