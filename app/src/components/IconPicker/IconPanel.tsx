import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Input, Segmented, Select } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import type { IconType } from '@/types';
import IconList from './IconList';
import IconPreview from './IconPreview';
import { categories, types } from './icons';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 288px;
`;

const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  padding-block: 4px 12px;
  gap: 12px;

  .ant-select-selection-item {
    text-align: right;
  }
`;

export interface IconPanelProps {
  value?: string;
  preview?: boolean;
  size?: SizeType;
  onChange: (name?: string) => void;
}

const IconPanel = (props: IconPanelProps) => {
  const { value, preview = true, size, onChange } = props;
  const [keywords, setKeywords] = useState('');
  const [hoverIcon, setHoverIcon] = useState<string | undefined>(value);
  const theme = useTheme();
  const [type, setType] = useState<IconType>('all');
  const [category, setCategory] = useState('all');

  return (
    <StyledContainer>
      <StyledFilter>
        <Flex gap={4} style={{ paddingInline: 20 }}>
          <Input
            placeholder={t('Please enter keywords...')}
            allowClear
            onChange={(e) => setKeywords(e.target.value)}
            prefix={
              <SearchOutlined style={{ color: theme.colorTextTertiary }} />
            }
            size={size}
            variant="filled"
          />
        </Flex>
        <Flex justify="space-between" style={{ paddingInline: '20px 10px' }}>
          <Segmented
            options={types}
            size="small"
            value={type}
            onChange={(val) => setType(val)}
          />
          <Select
            variant="borderless"
            options={categories}
            style={{ width: 120 }}
            size="small"
            value={category}
            onChange={(val) => setCategory(val)}
          />
        </Flex>
      </StyledFilter>

      <IconList
        onChange={onChange}
        current={value}
        keywords={keywords}
        type={type}
        category={category}
        onHover={setHoverIcon}
      />
      {preview && <IconPreview name={hoverIcon} />}
    </StyledContainer>
  );
};

export default IconPanel;
