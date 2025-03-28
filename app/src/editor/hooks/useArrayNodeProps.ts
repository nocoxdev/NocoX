import { isValidElement, useEffect, useState } from 'react';
import toArray from 'rc-util/lib/Children/toArray';

export function useArrayNodeProps<T>(
  children?: React.ReactNode,
  computeExtraProps?: (
    key: React.Key | null,
    props: T,
    index: number,
  ) => Record<string, any>,
) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const result = toArray(children)
      .map((node, index: number) => {
        if (!isValidElement(node)) {
          return null;
        }
        const { key, props } = node;
        return {
          ...(computeExtraProps?.(key as React.Key, props as T, index) ??
            (props as T)),
        };
      })
      .filter((item) => item) as T[];

    setItems(result);
  }, [children]);

  return items;
}
