import type { CSSProperties } from 'react';
import { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import NoWidget from '@/components/NoWidget';
import type { ValueLabel } from '@/types';
import { hasChildren } from '@/utils/helpers/hasChildren';

const StyledContainer = styled.div<{ $wrap: boolean; $gap?: number }>`
  display: inline-flex;
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  gap: ${({ $gap }) => $gap}px;
`;

export interface TagGroupProps {
  options: ValueLabel<string>[];
  wrap?: boolean;
  size?: number;
  closable?: boolean;
  bordered?: boolean;
  className?: string;
  color?: string;
  canAdd?: boolean;
  style?: CSSProperties;
}

const TagsView = (props: React.PropsWithChildren<TagGroupProps>) => {
  const {
    options = [],
    wrap = false,
    size = 0,
    canAdd,
    className,
    style,
    children,
  } = props;

  const [tags, setTags] = useState(options.map((option) => option.label));
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<InputRef>(null);

  const showInput = () => {
    // setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: 'top',
  };

  const tagPlusStyle: React.CSSProperties = {
    background: '#fff',
    borderStyle: 'dashed',
    marginRight: 0,
  };

  const addTagContent = canAdd ? (
    inputVisible ? (
      <Input
        ref={inputRef}
        type="text"
        size="small"
        style={tagInputStyle}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    ) : (
      <Tag style={tagPlusStyle} onClick={showInput}>
        <PlusOutlined /> {t('New Tag')}
      </Tag>
    )
  ) : null;

  return (
    <StyledContainer
      className={className}
      style={style}
      $wrap={wrap}
      $gap={size}
    >
      {hasChildren(children) ? (
        children
      ) : (
        <NoWidget description={t('Please add tags')} />
      )}
      {addTagContent}
    </StyledContainer>
  );
};

export default TagsView;
