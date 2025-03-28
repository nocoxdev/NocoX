import type { DependencyList, EffectCallback } from 'react';
import { useEffect, useState } from 'react';

export function useDelayEffect(
  effect: EffectCallback,
  ms: number,
  deps?: DependencyList,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => setCount((pre) => (pre === 99 ? 0 : pre + 1)),
      ms,
    );
    return () => clearTimeout(timeout);
  }, [deps]);

  useEffect(() => {
    return effect();
  }, [count]);
}
