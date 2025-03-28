import type { CSSProperties } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { Flex } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import ModalHeader from '@/components/Modal/ModalHeader';

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 48px);
`;

const StyledBack = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
`;

interface TemplateDetailViewerProps {
  id: string;
  visible?: boolean;
  style?: CSSProperties;
  onBack: () => void;
}

const TemplateDetailViewer = (props: TemplateDetailViewerProps) => {
  const { id, style, visible, onBack } = props;

  if (!id || !visible) return null;

  return (
    <Flex
      vertical
      style={{
        height: '68vh',
        minHeight: 560,
        display: visible ? 'flex' : 'none',
        ...style,
      }}
    >
      <ModalHeader>
        <StyledBack onClick={() => onBack()}>
          <IconArrowLeft size={13} stroke={2} />
          {t('Back')}
        </StyledBack>
      </ModalHeader>
      <StyledContent />
    </Flex>
  );
};

export default TemplateDetailViewer;
