export type ShadowType = 'none' | 'has';

export type ShadowResult = {
  type: ShadowType;
  value: string;
};

export interface ShadowValueType {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}
