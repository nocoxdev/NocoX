import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import type { InputRef } from 'antd';
import { Flex, Input, Tag } from 'antd';
import { t } from 'i18next';
import styled, { useTheme } from 'styled-components';
import { useMessage } from '@/selectors';

const StyledAddTagButton = styled(Tag)`
  background: ${({ theme }) => theme.colorBgContainer};
  border-style: dashed;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colorPrimaryBorder};
    color: ${({ theme }) => theme.colorPrimary};
  }
`;

const StyledAddonAfter = styled(Flex)`
  svg {
    color: ${({ theme }) => theme.colorPrimary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colorPrimaryActive};
    }
  }
`;

export interface TagInptProps {
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  color?: string;
}

const TagInput = (props: TagInptProps) => {
  const { color } = props;
  const [value, setValue] = useControllableValue<string[]>(props);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const theme = useTheme();
  const message = useMessage();

  const handleClose = (removedTag: string) => {
    const newTags = value.filter((tag) => tag !== removedTag);
    setValue(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (!inputValue) {
      message.warning(t('Tag cannot be empty'));
    } else {
      if (!value) {
        setValue([inputValue]);
      } else if (value.includes(inputValue)) {
        message.warning(t('Tag already exists'));
      } else {
        setValue([...value, inputValue]);
      }
    }

    setInputVisible(false);
    setInputValue('');
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const addonAfter = (
    <StyledAddonAfter gap={8}>
      <IconCheck size={13} stroke={1.5} onClick={handleInputConfirm} />

      <IconX
        size={13}
        stroke={1.5}
        onClick={() => {
          setInputVisible(false);
          setInputValue('');
        }}
      />
    </StyledAddonAfter>
  );

  return (
    <Flex gap={4} align="center" wrap="wrap">
      {value?.map((tag) => (
        <Tag key={tag} color={color} closable onClose={() => handleClose(tag)}>
          {tag}
        </Tag>
      ))}

      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onPressEnter={handleInputConfirm}
          variant="borderless"
          addonAfter={addonAfter}
          required
          style={{
            width: 200,
            marginInlineEnd: 8,
            verticalAlign: 'top',
            border: `1px solid ${theme.colorBorder}`,
            borderRadius: `${theme.borderRadius}px`,
          }}
        />
      ) : (
        <StyledAddTagButton
          icon={<PlusOutlined />}
          onClick={() => setInputVisible(true)}
        >
          {t('New tag')}
        </StyledAddTagButton>
      )}
    </Flex>
  );
};

export default TagInput;
