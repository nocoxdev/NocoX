import type { ComponentType } from 'react';
import type { Rule } from 'antd/es/form';

export type ValidationValue = {
  name: string;
  pattern?: string;
} & Omit<Rule, 'pattern'>;

export interface ValidationProps {
  name: string;
  label: string;
  size?: 'small' | 'middle' | 'large';
  defaultValue: ValidationValue;
  onChange: (val: ValidationValue) => void;
}

export interface ValidationFieldType {
  name: string;
  label: string;
  helpText?: string;
  component: ComponentType<any>;
  props?: Record<string, any>;
  editable?: boolean;
  visible?: boolean;
  required?: boolean;
}

export interface ValidationOption {
  name: string;
  label: string;
  defaultValue?: any;
  fields: ValidationFieldType[];
}
