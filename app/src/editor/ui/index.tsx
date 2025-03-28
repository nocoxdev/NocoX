import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { IconComponents, IconSettings } from '@tabler/icons-react';
import { Layout, Skeleton } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import ErrorMessage from '@/components/ErrorMessage';
import { useSite } from '@/selectors';
import { useApp } from '../selectors';
import Sider from './components/Sider';
import { GlobalStyle } from './styled';

const AppEditor = observer(() => {
  const app = useApp();
  const { pathname } = useLocation();
  const site = useSite();

  const [selected, setSelected] = useState(() => {
    const regex = /^\/edit\/([a-f0-9-]+)(\/([a-zA-Z0-9-_]+))?$/;
    const match = pathname.match(regex);
    return match?.[3] || 'editor';
  });

  const navigate = useNavigate();
  const items = [
    {
      name: 'editor',
      path: '',
      title: t('Editor'),
      icon: <IconComponents />,
    },
    {
      name: 'setting',
      title: t('Setting'),
      path: 'setting',
      icon: <IconSettings />,
    },
  ];

  useEffect(() => {
    app.widgetStore.loadWidgets();
  }, [site.lang]);

  // if (app.requestStates.fetchApp.status === 'pending') {
  //   return <Spin spinning fullscreen />;
  // }

  if (app.requestStates.fetchApp.status === 'error') {
    return <ErrorMessage>{app.requestStates.fetchApp.message}</ErrorMessage>;
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <GlobalStyle />
      <Layout.Sider width={48} theme="light">
        <Sider
          menus={items}
          selected={selected}
          onSelected={(name, path) => {
            setSelected(name);
            navigate(path);
          }}
        />
      </Layout.Sider>
      <Layout>
        <Skeleton
          loading={app.requestStates.fetchApp.status === 'pending'}
          active
          style={{ padding: 24 }}
        >
          <Outlet />
        </Skeleton>
      </Layout>
    </Layout>
  );
});

export default AppEditor;
