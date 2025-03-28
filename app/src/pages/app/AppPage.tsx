import { Fragment, useMemo } from 'react';
import { useFavicon, useTitle } from 'ahooks';
import { observer } from 'mobx-react-lite';
import logo from '@/assets/logo.svg';
import { useApp } from '@/editor/selectors';
import { getImageUrl } from '@/services/utils';

interface AppPageProps {
  id: string;
}

const AppPage = observer((props: AppPageProps) => {
  const { id } = props;

  const app = useApp();

  const memorizedLogo = useMemo(
    () => (app.favicon ? getImageUrl(app.favicon) : logo),
    [app.favicon],
  );

  useFavicon(memorizedLogo);
  useTitle(app.title);

  const page = useMemo(() => {
    return app.pages.find((item) => item.id === id);
  }, [app.pages, id]);

  return <Fragment>{page?.render('production')}</Fragment>;
});

export default AppPage;
