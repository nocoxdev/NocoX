import { useMemo } from 'react';
import type { RouteObject } from 'react-router';
import { createBrowserRouter } from 'react-router';
import { groupBy } from 'lodash-es';
import App from '@/pages/app';
import Preview from '@/pages/preview';
import type { AppPageResponse } from '@/services/responses';
import { PageType } from '@/types';

const getElement = (id: string, basename: string) => {
  const isApp = basename === 'app';
  const Component = isApp ? App : Preview;
  return <Component id={id} />;
};

export function useAppRouter(pages: AppPageResponse[], basename: string) {
  const router = useMemo(() => {
    if (pages.length === 0) {
      return;
    }

    const groups = groupBy(
      pages.filter((item) => item.type !== PageType.GROUP),
      'parentId',
    );

    const routes: RouteObject[] = Object.values(groups).reduce<RouteObject[]>(
      (acc, pages) => {
        const layout = pages.find((page) => page.type === PageType.LAYOUT);

        if (layout) {
          acc.push({
            path: `/:appId/${layout.path.replace('/', '')}`,
            element: getElement(layout.id, basename),
            children: pages
              .filter((page) => page.type === PageType.PAGE)
              .map((page) => ({
                path: page.path.replace('/', ''),
                element: getElement(page.id, basename),
              })),
          });
        } else {
          acc.push(
            ...pages.map((page) => ({
              path: `/:appId/${page.path.replace('/', '')}`,
              element: getElement(page.id, basename),
            })),
          );
        }
        return acc;
      },
      [],
    );

    return createBrowserRouter(routes, { basename: `/${basename}` });
  }, [pages, basename]);

  return router;
}
