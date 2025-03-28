import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Button, Flex } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import ResourceModal from '@/pages/common/Resource/ResourceModal';
import AttachmentItem from './AttachmentItem';

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

interface AttachmentSelectProps {
  value?: string;
  style?: React.CSSProperties;
  onChange?: (value?: string) => void;
}

const AttachmentSelect = (props: AttachmentSelectProps) => {
  const { style } = props;
  const [value, setValue] = useControllableValue<string>(props);
  const [modalOpen, setModalOpen] = useState(false);

  const attachmentIds = value ? value.split(',').map((id) => id.trim()) : [];

  const handleRemove = (idToRemove: string) => {
    const newIds = attachmentIds.filter((id) => id !== idToRemove);
    setValue(newIds.join(','));
  };

  const handleSelect = (newId: string) => {
    const newValue = value ? `${value},${newId}` : newId;
    setValue(newValue);
    setModalOpen(false);
  };

  return (
    <StyledContainer style={style}>
      <Button
        color="default"
        variant="dashed"
        size="small"
        block
        icon={<IconPlus size={14} />}
        onClick={() => setModalOpen(true)}
      >
        {t('Select')}
      </Button>

      <Flex gap={4} vertical>
        {attachmentIds.map((id) => (
          <AttachmentItem key={id} id={id} onRemove={handleRemove} />
        ))}
      </Flex>

      <ResourceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
      />
    </StyledContainer>
  );
};

export default AttachmentSelect;
