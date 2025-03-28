import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useAsyncEffect, useFavicon, useTitle } from 'ahooks';
import { t } from 'i18next';
import { AppApi, AppReleaseApi } from '@/services/api';
import type { AppPageResponse } from '@/services/responses';
import { getImageUrl } from '@/services/utils';

function getAppIdRegex(prefix: string) {
  return new RegExp(
    `/${prefix}/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})`,
  );
}

export function useInitApp(mode: string) {
  const [pages, setPages] = useState<AppPageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { showBoundary } = useErrorBoundary();
  const [favicon, setFavicon] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useTitle(title);
  useFavicon(getImageUrl(favicon));

  useAsyncEffect(async () => {
    const regex = getAppIdRegex(mode);
    const match = window.location.pathname.match(regex);
    if (match) {
      const appId = match[1];
      const response =
        mode === 'app'
          ? await AppReleaseApi.getRunningApp(appId)
          : await AppApi.getPreviewApp(appId);
      if (response.success) {
        setPages(response.data?.pages || []);
        setFavicon(response.data?.favicon || '');
        setTitle(response.data?.title || '');
      } else {
        showBoundary({ message: response.message });
      }
    } else {
      showBoundary({ message: t('appId not found') });
    }

    setLoading(false);
  }, []);

  return { loading, pages };
}
