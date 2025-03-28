import type { PageType } from './node';

export interface PageTemplateType {
  id: string;
  title: string;
  cover: string;
  description?: string;
  content: any;
  type: PageType;
}

export interface PageTemplateCategoryType {
  name: string;
  label: string;
  items: PageTemplateType[];
}
