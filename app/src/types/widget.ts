import type { ComponentType, CSSProperties } from 'react';
import type { IconProps } from '@tabler/icons-react';
import type { DefaultTheme } from 'styled-components';
import type { App, AppPage, PageNode } from '@/editor/stores';
import type { AppRunningMode, Direction, PageType, ValueLabel } from '@/types';

export interface WidgetData {
  id: string;
  name: string;
  value: any;
}

export type FlattenWidgetStyleConfig = WidgetStyleConfig & { pName: string };

export type ConfigCallback<T> = (args: {
  prop: { name: string; value: any };
  props: Record<string, any>;
  node: PageNode;
  page: AppPage;
  app: App;
}) => T | undefined;

export interface BaseWidgetPropConfig {
  name: string;
  span?: number;
  label?: string;
  labelStyle?: CSSProperties;
  direction?: Direction;
  helpText?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: any;
  visible?: ConfigCallback<boolean> | boolean;
  treeVisible?: ConfigCallback<boolean> | boolean;
  assist?: ConfigCallback<boolean> | boolean;
  mode?: AppRunningMode;
  computed?: {
    [key in 'default' | AppRunningMode]?: ConfigCallback<Record<string, any>>;
  };
  onChange?: (args: Parameters<ConfigCallback<void>>[0], value: any) => void;
  validate?: ConfigCallback<{ success: boolean; message?: string }>;
  controlProps?: ConfigCallback<Record<string, any>> | Record<string, any>;
}

export interface WidgetPropConfig extends BaseWidgetPropConfig {
  control?: string | ConfigCallback<string>;
  children?: WidgetPropConfig[];
}

export interface WidgetStyleConfig extends BaseWidgetPropConfig {
  control: string | ConfigCallback<string>;
  children?: WidgetStyleConfig[];
}

export interface WidgetPropGroupConfig {
  name: string;
  label: string;
  description?: string;
  children: WidgetPropConfig[];
}

export interface WidgetStyleGroupConfig {
  name: string;
  label: string;
  description?: string;
  children: WidgetStyleConfig[];
}

export interface WidgetEventConfig {
  name: string;
  label: string;
  helpText?: string;
  required?: boolean;
}

export interface WidgetActionConfig {
  name: string;
  label?: string;
  description?: string;
}

export type WidgetActionCallbackFn = (args: Record<string, any>) => void;

export interface WidgetDropLimitConfig {
  ancestor?: string[];
  parent?: string[];
  children?: string[];
  childrenMaxCount?: number;
}

export interface WidgetElementConfig {
  name: string;
  label?: string;
  props?: Record<string, any>;
  styles?: Record<string, any>;
  elements?: Record<string, WidgetElementConfig[] | WidgetElementConfig>;
}

export interface WidgetTypeConfig {
  name: string;
  view: any;
  label: string;
  icon?: ComponentType<IconProps>;
  tags?: string[];
  color?: string | ((theme: DefaultTheme) => string);
  showInExplorer?: boolean;
  canDrag?: boolean;
  canDrop?: boolean;
  canCopy?: boolean;
  canDelete?: boolean;
  canSelect?: boolean;
  limit?: WidgetDropLimitConfig;
  showToolbar?: boolean;
  showToolbarMore?: boolean;
  propGroups?: WidgetPropGroupConfig[];
  styleGroups?: WidgetStyleGroupConfig[];
  events?: WidgetEventConfig[];
  actions?: string[];
  defaultTemplate?: WidgetElementConfig;
}

export type WidgetGroupConfig = {
  name: string;
  label: string;
  icon?: ComponentType<IconProps>;
  widgets: WidgetTypeConfig[];
  showType: 'ALL' | PageType;
};

export interface BaseWidgetProps {
  node: PageNode;
  ref?: any;
  value?: any;
  defaultValue?: any;
  dataName?: any;
  dataLabel?: string;
  dataValidation?: any;
  onChange?: (val: any) => void;
}

export type WidgetProps<T> = BaseWidgetProps & T;

export type FlattenWidgetPropConfig = WidgetPropConfig & { pName: string };

export type OptionsType = 'custom' | 'dataTable' | 'dictionary';

export interface EnhancedOptions {
  type: OptionsType;
  options?: ValueLabel<any>[];
  dataTable?: {
    tableId: string;
    columnName: string;
  };
  dictionary?: {
    groupId?: string;
  };
}

export type MergedEnhancedOptions = EnhancedOptions | ValueLabel<any>[];

export type EnhancedOptionsProps<T> = Omit<T, 'options'> & {
  options: MergedEnhancedOptions;
};

export type EnhancedTreeOptionsProps<T> = Omit<T, 'treeData'> & {
  treeData: MergedEnhancedOptions;
};
