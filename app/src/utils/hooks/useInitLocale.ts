import { useEffect, useMemo } from 'react';
import { useLocalStorageState } from 'ahooks';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { LNG_KEY } from '@/constants';

export function useInitLocale() {
  const [language] = useLocalStorageState<string>(LNG_KEY, {
    deserializer: (value) => value,
    serializer: (value) => value,
  });

  useEffect(() => {
    dayjs.locale(language);
  }, [language]);

  const antdLocale = useMemo(() => {
    return language === 'zh-CN' ? zhCN : enUS;
  }, [language]);

  return { antdLocale };
}
