import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { useMount } from 'ahooks';
import { debounce } from 'lodash-es';
import type { Rect } from '@/types';

export function useDomObserver(
  el: HTMLElement | undefined | null,
  callback: (rect: Rect) => void,
  deps?: DependencyList,
) {
  const observerRef = useRef<ResizeObserver>(
    new ResizeObserver((entries) => {
      entries.forEach(
        debounce((entry) => {
          const rect: Rect = entry.target.getBoundingClientRect();
          callback(rect);
        }, 5),
      );
    }),
  );

  useMount(() => {
    return () => observerRef.current.disconnect();
  });

  useEffect(() => {
    const observer = observerRef.current;

    if (el) {
      observer.observe(el);
      return () => observer.unobserve(el);
    }
  }, deps);
}
