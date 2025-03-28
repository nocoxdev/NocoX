import type { Ref } from 'react';
import { useEffect, useImperativeHandle, useState } from 'react';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import { CANVAS_ID } from '@/constants';
import { useAppRunningMode } from '@/editor/selectors';

interface ModalViewAction {
  open: () => void;
  close: () => void;
}

interface ModalViewProps extends ModalProps {
  ref: Ref<ModalViewAction>;
}

const ModalView = ({ ref, ...props }: ModalViewProps) => {
  const { height, footer, className, ...restProps } = props;
  const [open, setOpen] = useState(false);

  const mode = useAppRunningMode();

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const editProps =
    mode === 'edit'
      ? { getContainer: () => document.getElementById(CANVAS_ID)! }
      : {};

  useEffect(() => {
    setOpen(props.open ?? false);
  }, [props.open]);

  return (
    <Modal
      {...restProps}
      {...editProps}
      classNames={{
        content: className,
      }}
      open={mode === 'edit' ? props.open : open}
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
      footer={footer || null}
      styles={{ body: { height } }}
    />
  );
};

export default ModalView;
