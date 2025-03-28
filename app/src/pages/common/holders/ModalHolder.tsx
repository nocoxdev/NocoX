import { Fragment } from 'react';
import { useDebounceEffect } from 'ahooks';
import type { ModalFuncProps } from 'antd';
import { Modal } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useModal } from '@/selectors';

const config: ModalFuncProps = {
  okText: t('Confirm'),
  cancelText: t('Cancel'),
  okButtonProps: {
    size: 'small',
  },
  cancelButtonProps: {
    size: 'small',
    type: 'text',
  },
};

export const ModalHolder = observer(() => {
  const modalManager = useModal();

  const [modal, contextHolder] = Modal.useModal();

  useDebounceEffect(
    () => {
      const last = modalManager.pop();

      if (!last) return;

      const props = {
        ...config,
        ...last,
      };

      modal[last.type as keyof typeof modal](props);
    },
    [modalManager.modals],
    { leading: true },
  );

  return <Fragment>{contextHolder}</Fragment>;
});
