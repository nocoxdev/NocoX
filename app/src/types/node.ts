import type { ActionConfig } from '@/editor/actions/type';
import type { FlattenWidgetPropConfig } from './widget';

export interface NodeStyle {
  name: string;
  value: any;
  defaultValue: any;
}

export interface NodePropValidation {
  success: boolean;
  message?: string;
}

export interface NodeProp {
  pName?: string;
  name: string;
  value: any;
  label?: string;
  config: FlattenWidgetPropConfig;
}

export interface FlatNodeEventAction {
  pId: string;
  id: string;
  eventName: string;
  actionName: string;
  actionId: string;
}

export interface NodeEventAction {
  id: string;
  name: string;
  callbacks: NodeEvent[];
  config?: Record<string, any>;
}

export interface NodeEvent {
  id: string;
  name: string;
  actions: NodeEventAction[];
  availableParams?: string[];
}

export interface PageNodeJson {
  id?: string;
  name: string;
  label?: string;
  visible?: boolean;
  props?: Record<string, any>;
  styles?: Record<string, any>;
  elements?: Record<string, PageNodeJson[]>;
  events?: NodeEvent[];
}

export interface NodeActionCallback {
  name: string;
  label: React.ReactNode;
  description?: string;
}

export interface NodeAction {
  id: string;
  nodeId: string;
  name: string;
  label: string;
  description?: string;
  config: ActionConfig;
}

export enum NodeType {
  ROOT,
  ELEMENT,
  ATTRIBUTE,
}

export enum PageType {
  LAYOUT,
  PAGE,
  GROUP,
}
