import type { ModalProps } from 'antd';
import { Modal } from 'antd';

interface DraggableModalProps extends ModalProps {}

const DraggableModal = (props: DraggableModalProps) => {
  return <Modal {...props} />;
};

export default DraggableModal;
