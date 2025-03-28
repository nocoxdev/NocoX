import { useState } from 'react';
import { useControllableValue } from 'ahooks';
import { Avatar, Button, Flex } from 'antd';
import { t } from 'i18next';
import ResourceModal from '@/pages/common/Resource/ResourceModal';
import { StyledAvatarContainer } from '@/pages/common/styled';
import { getImageUrl } from '@/services/utils';

interface AvatarInputProps {
  userName?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const AvatarInput = (props: AvatarInputProps) => {
  const { userName } = props;
  const [value, setValue] = useControllableValue<string>(props);
  const [resourceOpen, setResourceOpen] = useState(false);

  return (
    <Flex align="center" gap={10}>
      {value ? (
        <Avatar src={getImageUrl(value)} size={64} shape="circle" />
      ) : (
        <StyledAvatarContainer $size={64} $fontSize={32}>
          {userName?.[0].toUpperCase()}
        </StyledAvatarContainer>
      )}

      <Button
        color="primary"
        variant="outlined"
        size="small"
        style={{ width: 60 }}
        onClick={() => setResourceOpen(true)}
      >
        {t('Change')}
      </Button>
      <Button
        type="default"
        danger
        size="small"
        style={{ width: 60 }}
        onClick={() => setValue('')}
      >
        {t('Delete')}
      </Button>
      <ResourceModal
        onSelect={(id) => {
          setValue(id);
          setResourceOpen(false);
        }}
        open={resourceOpen}
        onClose={() => setResourceOpen(false)}
      />
    </Flex>
  );
};

export default AvatarInput;
