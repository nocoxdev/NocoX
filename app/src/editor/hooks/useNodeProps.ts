import { useArrayNodeProps } from './useArrayNodeProps';

export function useNodeProps<T>(
  children?: React.ReactNode,
  computeExtraProps?: (
    key: React.Key | null,
    props: T,
    index: number,
  ) => Record<string, any>,
) {
  const items = useArrayNodeProps(children, computeExtraProps);

  return items?.[0];
}
