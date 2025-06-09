import { useEffect } from 'react';
import { Layout, Spin, Splitter } from 'antd';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import ErrorMessage from '@/components/ErrorMessage';
import { useApp } from '@/editor/selectors';
import { useSite } from '@/selectors';
import Header from './Header';
import Left from './Left';
import Right from './Right';
import Simulator from './Simulator';
import { GlobalStyle } from './styled';

const Editor = observer(() => {
  const theme = useTheme();

  const app = useApp();
  const site = useSite();

  useEffect(() => {
    app.widgetStore.loadWidgets();
  }, [site.lang]);

  if (app.requestStates.fetchApp.status === 'pending') {
    return <Spin spinning fullscreen />;
  }

  if (app.requestStates.fetchApp.status === 'error') {
    return <ErrorMessage>{app.requestStates.fetchApp.message}</ErrorMessage>;
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <GlobalStyle />

      <Layout.Header
        style={{
          padding: 0,
          height: theme.heightHeader,
          lineHeight: 1,
          minWidth: 1080,
        }}
      >
        <Header />
      </Layout.Header>
      <Layout>
        <Splitter>
          <Splitter.Panel
            min={100}
            max={550}
            defaultSize={theme.widthDesignerLeftSidebar}
          >
            <Left />
          </Splitter.Panel>
          <Splitter.Panel>
            <Simulator />
          </Splitter.Panel>
          <Splitter.Panel
            key="right"
            min={220}
            max={500}
            defaultSize={theme.widthDesignerRightSidebar}
          >
            <Right />
          </Splitter.Panel>
        </Splitter>
      </Layout>
    </Layout>
  );
});

export default Editor;
