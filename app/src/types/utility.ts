export type ExtractParameterType<T> = T extends (arg: infer P) => any
  ? P
  : never;

export type ExtractReturnType<T> = T extends (arg: any) => infer R ? R : never;

export type ArrayValues<T extends readonly unknown[]> = T[number];

export type UniqueArray<T> = T[] & { __unique?: never };
