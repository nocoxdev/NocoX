import type { ComponentType } from 'react';
import type { UiType } from '@/types';

export enum FilterConjunction {
  And = 1,
  Or,
}

export interface IFilterCondition {
  key: string;
  name?: string;
  operator?: Operator;
  value?: any;
  type?: UiType;
}

export interface IFilterInfo {
  conjunction: FilterConjunction;
  conditions: IFilterCondition[];
}

export interface ValueComponentProps {
  value: any;
  onChange: (val: any) => void;
  size?: 'large' | 'middle' | 'small';
}

export interface ValueTypeFilterOperators {
  types: UiType[];
  operators: Operator[];
  valueComponent?: ComponentType<ValueComponentProps>;
  props?: Record<string, any>;
}

export enum Operator {
  Equal = 1,
  NotEqual,
  Contain,
  NotContain,
  GreaterThan,
  GreaterThanEqual,
  LessThan,
  LessThanEqual,
  StartWith,
  EndWith,
}

export interface IFilterOperatorInfo {
  operator: Operator;
  label: string;
  hasValue: boolean;
}
