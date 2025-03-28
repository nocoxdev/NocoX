import type { DependencyList } from 'react';
import { useEffect, useState } from 'react';

export function useForceRenderKey(deps?: DependencyList) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((pre) => pre + 1);
  }, deps);

  return count;
}
