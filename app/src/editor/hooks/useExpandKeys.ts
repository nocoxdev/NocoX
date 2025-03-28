import { useEffect, useState } from 'react';
import { usePrevious } from 'ahooks';

export function useExpandKeys<T>(state: T[] | undefined) {
  const [expandedKeys, setExpandedKeys] = useState<T[]>([]);
  const previous = usePrevious(state);

  useEffect(() => {
    if (state) {
      setExpandedKeys((pre) =>
        pre
          .filter((item) => state?.includes(item))
          .concat(state?.filter((item) => !previous?.includes(item))),
      );
    }
  }, [state]);

  return [expandedKeys, setExpandedKeys] as const;
}
