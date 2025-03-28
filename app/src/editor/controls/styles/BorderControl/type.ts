export type BorderStyle = 'solid' | 'dashed' | 'dotted';
export type BorderSide =
  | 'border'
  | 'borderTop'
  | 'borderRight'
  | 'borderBottom'
  | 'borderLeft';

export type ValueType = {
  [key in BorderSide]: string;
};
