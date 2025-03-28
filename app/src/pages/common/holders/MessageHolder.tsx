import { Fragment } from 'react';
import { useDebounceEffect, useUnmount } from 'ahooks';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useMessage } from '@/selectors';

export const MessageHolder = observer(() => {
  const messageManager = useMessage();

  const [api, contextHolder] = message.useMessage();

  useDebounceEffect(
    () => {
      const last = messageManager.pop();

      if (!last) return;

      switch (last.type) {
        case 'error':
          api.error(last.content);
          break;
        case 'warning':
          api.warning(last.content);
          break;
        case 'info':
          api.info(last.content);
          break;
        case 'success':
          api.success(last.content);
          break;
      }
    },
    [messageManager.messages],
    { leading: true },
  );

  useUnmount(() => {
    api.destroy();
  });

  return <Fragment>{contextHolder}</Fragment>;
});
