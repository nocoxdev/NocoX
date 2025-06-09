import { createContext } from 'react';
import type { PageTemplateType } from '@/types';

export interface PageTempateContextType {
  templates: PageTemplateType[];
  current?: string;
  parentId?: string;
  setCurrent: (id: string) => void;
}

export const PageTempateContext = createContext<PageTempateContextType>(
  {} as any,
);
