import { useMemo } from 'react';
import { useParams } from 'react-router';
import ErrorBoundary from '@/components/ErrorBoundary';
import actions from '@/editor/actions';
import type { AppEditorContextType } from '@/editor/context';
import { AppEditorContext } from '@/editor/context';
import { App, Canvas } from '@/editor/stores';
import Editor from '@/editor/ui';
import { useMessage, useModal, useNotification } from '@/selectors';
import NoFoundPage from '../404';

const EditAppPage = () => {
  const { appId } = useParams();
  const message = useMessage();
  const notification = useNotification();
  const modal = useModal();

  const defaultContextValue: AppEditorContextType | undefined = useMemo(() => {
    if (appId) {
      const app = new App(appId, 'edit', actions, message, notification, modal);
      const canvas = new Canvas(app);

      return {
        app,
        canvas,
        size: 'small',
      };
    }
  }, [appId]);

  return appId ? (
    <ErrorBoundary onReset={() => location.reload()}>
      <AppEditorContext.Provider value={defaultContextValue!}>
        <Editor />
      </AppEditorContext.Provider>
    </ErrorBoundary>
  ) : (
    <NoFoundPage />
  );
};

export default EditAppPage;
