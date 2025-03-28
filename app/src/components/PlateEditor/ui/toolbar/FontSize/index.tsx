import { Select } from 'antd';
import styled from 'styled-components';
import { MARK_FONT_SIZE } from '@/components/PlateEditor/constants';
import { useCurrentSize } from '@/components/PlateEditor/hooks';
import { FONT_SIZE_TYPES } from './constants';
import { useFontSizeSelect } from './useFontSizeSelect';

const StyledWrapper = styled.div<{ $height: number }>`
  .ant-select {
    width: 80px;
    height: ${({ $height }) => $height - 4}px !important;
    .ant-select-selection-search-input,
    .ant-select-selection-item {
      height: ${({ $height }) => $height - 4}px !important;
    }
  }

  .ant-select-focused {
    .ant-select-selector {
      border: 1px solid transparent !important;
      outline: none !important;
      background: ${({ theme }) => theme.colorFillSecondary} !important;
    }
  }
`;

const FontSizeSelect = () => {
  const { fontSize, clearFontSize, updateFontSize } =
    useFontSizeSelect(MARK_FONT_SIZE);

  const { size, height } = useCurrentSize();

  return (
    <StyledWrapper $height={height}>
      <Select
        size={size}
        variant="filled"
        options={FONT_SIZE_TYPES.map((size) => ({ label: size, value: size }))}
        allowClear
        onClear={clearFontSize}
        value={fontSize}
        onChange={updateFontSize}
        popupMatchSelectWidth
      />
    </StyledWrapper>
  );
};

export default FontSizeSelect;
