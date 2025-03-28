import { createContext } from 'react';

interface FormContextType {
  record: Record<string, any>;
}

export const FormContext = createContext<FormContextType>({} as any);
