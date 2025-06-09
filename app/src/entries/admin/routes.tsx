import type { RouteObject } from 'react-router';
import NoFoundPage from '@/pages/404';
import Dashboard from '@/pages/dashboard';
import MyApps from '@/pages/dashboard/myApps';
import Releases from '@/pages/dashboard/releases';
import Resource from '@/pages/dashboard/resource';
import Roles from '@/pages/dashboard/roles';
import UserManager from '@/pages/dashboard/users';
import Workspace from '@/pages/dashboard/workspace';
import Database from '@/pages/database';
import Dictionary from '@/pages/dictionary';
import EditAppPage from '@/pages/edit';
import Login from '@/pages/login';
import Settings from '@/pages/settings';
import Password from '@/pages/settings/password';
import Profile from '@/pages/settings/profile';

const routes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '/',

    children: [
      {
        path: '',
        element: <Dashboard />,
        children: [
          {
            path: '',
            index: true,
            element: <MyApps />,
          },
          {
            path: 'workspace/:workspaceId',
            element: <Workspace />,
          },
          {
            path: 'my-apps',
            element: <MyApps />,
          },
          {
            path: 'releases',
            element: <Releases />,
          },
          {
            path: 'users',
            element: <UserManager />,
          },
          {
            path: 'roles',
            element: <Roles />,
          },
          {
            path: 'resource',
            element: <Resource />,
          },
        ],
      },
      {
        path: 'database',
        element: <Database />,
      },
      {
        path: 'dictionary',
        element: <Dictionary />,
      },

      {
        path: 'settings',
        element: <Settings />,
        children: [
          {
            index: true,
            path: '',
            element: <Profile />,
          },
          {
            index: true,
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'password',
            element: <Password />,
          },
        ],
      },
    ],
  },
  {
    path: 'edit/:appId',
    element: <EditAppPage />,
  },
  {
    path: '404',
    element: <NoFoundPage />,
  },
];

export default routes;
