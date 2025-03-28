import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn';
import { ADMIN_BASE_URL } from '@/constants';
import { GlobalContext, globalContextValue } from '@/context/GlobalContext';
import {
  MessageHolder,
  ModalHolder,
  NotificationHolder,
} from '@/pages/common/holders';
import GlobalStyles from '@/styles';
import { NocoXThemeProvider } from '@/themes/index';
import { getThemeConfig } from '@/themes/utils';
import { useInitLocale } from '@/utils/hooks';
import routes from './routes';

const theme = getThemeConfig(globalContextValue.site.theme || 'light');

const Content = () => {
  const { antdLocale } = useInitLocale();
  const contextValue = useMemo(() => {
    return globalContextValue;
  }, []);

  const router = useMemo(() => {
    return createBrowserRouter(routes, { basename: ADMIN_BASE_URL });
  }, []);

  return (
    <GlobalContext.Provider value={contextValue}>
      <ConfigProvider
        theme={theme.antTheme}
        locale={antdLocale}
        wave={{ disabled: true }}
      >
        <NocoXThemeProvider theme={theme.type}>
          <GlobalStyles />
          <NotificationHolder />
          <MessageHolder />
          <ModalHolder />

          <RouterProvider router={router} />
        </NocoXThemeProvider>
      </ConfigProvider>
    </GlobalContext.Provider>
  );
};

export default Content;
