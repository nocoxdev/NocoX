import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import styled from 'styled-components';
import { useApp } from '@/editor/selectors';

const StyledIframe = styled.iframe`
  display: block;
  height: 100%;
  width: 100%;
  border: none;
`;

interface PreviewModalProps extends ModalProps {}

const PreviewModal = (props: PreviewModalProps) => {
  const app = useApp();
  return (
    <Modal
      {...props}
      footer={null}
      centered
      maskClosable
      closable={false}
      styles={{
        content: {
          height: '95vh',
          padding: 0,
        },
        body: {
          padding: 0,
          height: '100%',
          width: '100%',
        },
      }}
      width="95vw"
      destroyOnClose
    >
      <StyledIframe src={`/preview/${app.id}`} />
    </Modal>
  );
};

export default PreviewModal;
