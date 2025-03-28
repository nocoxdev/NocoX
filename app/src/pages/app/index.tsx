import { useMemo } from 'react';
import { useParams } from 'react-router';
import actions from '@/editor/actions';
import type { AppEditorContextType } from '@/editor/context';
import { AppEditorContext } from '@/editor/context';
import { App, Canvas } from '@/editor/stores';
import { useMessage, useModal, useNotification } from '@/selectors';
import NoFoundPage from '../404';
import AppPage from './AppPage';

interface IndexProps {
  id: string;
}

const Index = (props: IndexProps) => {
  const { id } = props;
  const { appId } = useParams();
  const message = useMessage();
  const notification = useNotification();
  const modal = useModal();

  const defaultContextValue: AppEditorContextType | undefined = useMemo(() => {
    if (appId) {
      const app = new App(
        appId,
        'production',
        actions,
        message,
        notification,
        modal,
      );
      const canvas = new Canvas(app);

      return {
        app,
        canvas,
        size: 'small',
      };
    }
  }, [appId]);

  if (!appId) {
    return <NoFoundPage />;
  }

  return appId ? (
    <AppEditorContext.Provider value={defaultContextValue!}>
      <AppPage id={id} />
    </AppEditorContext.Provider>
  ) : (
    <NoFoundPage />
  );
};

export default Index;
