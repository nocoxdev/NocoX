import { useCallback, useEffect, useState } from 'react';
import { useScroll } from 'ahooks';

export function useSticky(
  stickyEl: HTMLElement | undefined | null,
  scrollEl: HTMLElement | undefined | null,
) {
  const [sticky, setSticky] = useState(false);

  const scroll = useScroll(scrollEl);

  const observe = useCallback(() => {
    if (!stickyEl || !scrollEl) return;
    const stickyElTop = stickyEl.getBoundingClientRect().top;
    const scrollElTop = scrollEl.getBoundingClientRect().top;

    setSticky(stickyElTop < scrollElTop);
  }, [stickyEl, scrollEl]);

  useEffect(() => {
    observe();
  }, [scroll, stickyEl, scrollEl]);

  return sticky;
}
