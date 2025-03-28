import { isValidElement, useEffect, useState } from 'react';
import toArray from 'rc-util/lib/Children/toArray';

export function useTreeNodeProps<T extends Record<string, any>>(
  children?: React.ReactNode,
  computeExtraProps?: (
    key: React.Key | null,
    props: T,
    index: number,
  ) => Record<string, any>,
) {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    const loop = (children: React.ReactNode): T[] => {
      return toArray(children)
        .map((node, index: number): T | null => {
          if (!isValidElement(node)) {
            return null;
          }
          const { key, props } = node;

          const _props = props as any;

          const children = _props?.children && loop(_props.children);
          const newProps = {
            ...(computeExtraProps?.(key as React.Key, _props as T, index) ??
              (_props as T)),
            children,
          };

          return newProps as unknown as T;
        })
        .filter((item) => item) as T[];
    };
    const result = loop(children);

    setItems(result);
  }, [children]);

  return items;
}
