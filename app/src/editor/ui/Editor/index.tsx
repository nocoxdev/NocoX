import { Layout, Splitter } from 'antd';
import { useTheme } from 'styled-components';
import Header from './Header';
import Left from './Left';
import Right from './Right';
import Simulator from './Simulator';

const Editor = () => {
  const theme = useTheme();

  return (
    <Layout>
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
};

export default Editor;
