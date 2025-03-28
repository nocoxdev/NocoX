import { createContext } from 'react';
import type { DictionaryGroupResponse } from '@/services/responses';

export interface DictionaryContextType {
  currentGroup?: DictionaryGroupResponse;
  setCurrentGroup: (group?: DictionaryGroupResponse) => void;
}

export const DictionaryContext = createContext<DictionaryContextType>(
  {} as any,
);
