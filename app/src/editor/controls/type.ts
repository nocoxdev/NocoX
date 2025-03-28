import type { ComponentType } from 'react';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { PageNode } from '@/editor/stores';

export type EditPopoverField = {
  name: string;
  label: string;
  helpText?: string;
  control?: string;
  defaultValue?: ((index: number) => any) | any;
  editable?: boolean;
  showInList?: boolean;
  required?: boolean;
};

export type ControlProps<T> = {
  name: string;
  childrenNodes?: PageNode[];
  node?: PageNode;
  size?: SizeType;
  defaultValue?: any;
  value?: any;
  placeholder?: string;
  variant?: Variant;
  controlProps?: T;
  onChange: (value: any) => void;
};

export type ControlType<T> = {
  name: string;
  control: ComponentType<ControlProps<T>>;
};

export type FormatItemProps = {
  value: any;
  onFormat: (format: Record<string, any>) => void;
};

export type OptionsDataType = 'custom' | 'dataTable' | 'dictionary';
