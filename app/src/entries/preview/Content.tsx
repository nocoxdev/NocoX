import { RouterProvider } from 'react-router';
import { ConfigProvider, Empty, Spin } from 'antd';
import 'dayjs/locale/zh-cn';
import { GlobalContext, globalContextValue } from '@/context/GlobalContext';
import { useInitApp } from '@/editor/hooks';
import { useAppRouter } from '@/editor/hooks';
import '@/i18n';
import { MessageHolder, ModalHolder } from '@/pages/common/holders';
import { NotificationHolder } from '@/pages/common/holders';
import GlobalStyles from '@/styles';
import { NocoXThemeProvider } from '@/themes/index';
import { getThemeConfig } from '@/themes/utils';
import { useInitLocale } from '@/utils/hooks';

const Content = () => {
  const theme = getThemeConfig(globalContextValue.site.theme);
  const { loading, pages } = useInitApp('preview');

  const router = useAppRouter(pages, 'preview');
  const { antdLocale } = useInitLocale();

  return (
    <GlobalContext.Provider value={globalContextValue}>
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
          {loading ? (
            <Spin spinning fullscreen />
          ) : router ? (
            <RouterProvider router={router} />
          ) : (
            <Empty description="No pages found" style={{ paddingTop: 100 }} />
          )}
        </NocoXThemeProvider>
      </ConfigProvider>
    </GlobalContext.Provider>
  );
};

export default Content;
