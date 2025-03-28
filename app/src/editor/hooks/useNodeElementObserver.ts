import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { useMount } from 'ahooks';
import { debounce } from 'lodash-es';
import type { Rect } from '@/types';
import { getElByNodeId, isHidden } from '../utils';

export function useNodeElementObserver(
  id: string | undefined,
  callback: (rect: Rect | undefined) => void,
  deps: DependencyList | undefined,
  delay?: number,
  delayDeps?: DependencyList | undefined,
) {
  const prevId = useRef(id);
  const animationFrameId = useRef(0);

  const observerRef = useRef<ResizeObserver>(
    new ResizeObserver((entries) => {
      entries.forEach(
        debounce((entry) => {
          const rect: Rect = entry.target.getBoundingClientRect();
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = requestAnimationFrame(() =>
            callback(rect),
          );
        }, 10),
      );
    }),
  );

  useMount(() => {
    const observer = observerRef.current;
    return () => observer.disconnect();
  });

  useEffect(() => {
    if (!id) return;

    const el = getElByNodeId(id);
    const hidden = isHidden(el as HTMLElement);

    if (!el || hidden) {
      callback(undefined);
      return;
    }

    const observer = observerRef.current;

    if (el) {
      observer.observe(el);
      return () => observer.unobserve(el);
    }
  }, deps);

  useEffect(() => {
    if (!id || !delay || !delayDeps) return;

    if (prevId.current !== id) {
      prevId.current = id;
      return;
    }

    const el = getElByNodeId(id);
    const hidden = isHidden(el as HTMLElement);

    if (!el || hidden) {
      callback(undefined);
      return;
    }

    const observer = observerRef.current;

    if (el) {
      const timeoutId = setTimeout(() => {
        observer.observe(el);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
        observer.unobserve(el);
      };
    }
  }, delayDeps);
}
