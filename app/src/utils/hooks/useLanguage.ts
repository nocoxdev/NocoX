import { useLocalStorageState } from 'ahooks';
import { LNG_KEY } from '@/constants';

export function useLanguage() {
  const [language, setLanguage] = useLocalStorageState<string>(LNG_KEY, {
    deserializer: (value) => value,
    serializer: (value) => value,
    defaultValue: navigator.language,
  });

  return [language, setLanguage] as const;
}
