import { Fragment } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import type { ModalProps } from 'antd';
import { Modal, Skeleton } from 'antd';
import { styled } from 'styled-components';
import ErrorBoundary from '../ErrorBoundary';
import ModalHeader from './ModalHeader';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 24px 0px;
  padding-bottom: 12px;
`;

const StyledContent = styled.div`
  padding-inline: 24px;
  padding-top: 12px;
`;

export interface EnhancedModalProps
  extends Omit<
    ModalProps,
    'footer' | 'styles' | 'closable' | 'onOk' | 'onCancel'
  > {
  headerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  headerExpandButtons?: { name: string; children: React.ReactNode }[];
  error?: string | boolean;
  onOk?: () => void;
  onClose?: () => void;
  onErrorReset?: () => void;
}

interface ModalContentProps {
  children: React.ReactNode;
  error?: string | boolean;
}

const ModalContent = (props: ModalContentProps) => {
  const { children, error } = props;

  const { showBoundary } = useErrorBoundary();

  if (error) {
    showBoundary({ message: error });
  }

  return <Fragment>{children}</Fragment>;
};

const EnhancedModal = (props: EnhancedModalProps) => {
  const {
    loading,
    error,
    title,
    style,
    headerStyle,
    contentStyle,
    wrapperStyle,
    children,
    headerExpandButtons,
    onClose,
    onErrorReset,
    ...restProps
  } = props;
  return (
    <Modal
      {...restProps}
      footer={null}
      closable={false}
      title={false}
      styles={{
        content: { padding: 0 },
      }}
      onCancel={onClose}
      style={style}
    >
      <StyledContainer style={wrapperStyle}>
        <ModalHeader
          style={headerStyle}
          onClose={onClose}
          expandButtons={headerExpandButtons}
        >
          {title}
        </ModalHeader>

        <StyledContent style={contentStyle}>
          <Skeleton active loading={loading}>
            <ErrorBoundary onReset={onErrorReset}>
              <ModalContent error={error}>{children}</ModalContent>
            </ErrorBoundary>
          </Skeleton>
        </StyledContent>
      </StyledContainer>
    </Modal>
  );
};

export default EnhancedModal;
