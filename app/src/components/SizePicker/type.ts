export type SizeUnit = 'px' | '%' | 'em' | 'rem' | 'vw' | 'auto';

export interface SizeValue {
  number?: number;
  unit?: SizeUnit;
}
