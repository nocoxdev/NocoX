import { Fragment } from 'react';
import { useDebounceEffect, useUnmount } from 'ahooks';
import { notification } from 'antd';
import type { ArgsProps } from 'antd/es/notification';
import { omit } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { useNotification } from '@/selectors';

export const NotificationHolder = observer(() => {
  const notifictionStore = useNotification();
  const [api, contextHolder] = notification.useNotification();

  useDebounceEffect(
    () => {
      const last = notifictionStore.pop();

      if (!last) return;

      const args = omit(last, 'type') as ArgsProps;

      // (api[last.type as keyof typeof api] as any)(omit(last, 'type'));

      switch (last.type) {
        case 'error':
          api.error(args);
          break;
        case 'warning':
          api.warning(args);
          break;
        case 'info':
          api.info(args);
          break;
        case 'success':
          api.success(args);
          break;
      }
    },
    [notifictionStore.notifications],
    { leading: true },
  );

  useUnmount(() => {
    api.destroy();
  });

  return <Fragment>{contextHolder}</Fragment>;
});
