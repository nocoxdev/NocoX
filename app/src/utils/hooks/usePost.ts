import { useRequest } from 'ahooks';
import type { Service } from 'ahooks/lib/useRequest/src/types';

export function usePost<T>(service: Service<T, [params: any]>) {
  const { loading, run, runAsync } = useRequest(
    (params: any) => {
      return service(params);
    },
    {
      manual: true,
    },
  );

  return {
    submitting: loading,
    post: run,
    postAsync: runAsync,
  };
}
