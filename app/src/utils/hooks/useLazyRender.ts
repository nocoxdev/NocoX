import { useEffect, useState } from 'react';

export function useLazyRender(condition: boolean) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    condition && setIsRendered(true);
  }, [condition]);

  return isRendered;
}
