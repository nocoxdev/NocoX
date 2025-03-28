import { useMemo } from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber, Select } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { styled } from 'styled-components';
import type { SizeUnit, SizeValue } from './type';
import { useSizeValue } from './useSizeValue';

const SizePickerContainer = styled.div<{ $width?: number }>`
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  display: flex;

  gap: 6px;
  .ant-select-selector {
    padding: 0 4px !important;

    .ant-select-selection-item {
      font-weight: 600;
      line-height: 24px;
    }
  }
`;

export interface SizePickerProps
  extends Omit<InputNumberProps, 'onChange' | 'value'> {
  value?: string;
  size?: SizeType;
  excludeTypes?: SizeUnit[];
  style?: React.CSSProperties;
  width?: number;
  onChange?: (value: string | undefined) => void;
}

const SizeUnits: SizeUnit[] = ['px', '%', 'em', 'rem', 'vw', 'auto'];

const SizePicker = (props: SizePickerProps) => {
  const { excludeTypes, size, style, width, ...restProps } = props;
  const { innerValue, changeValue } = useSizeValue(props);

  const options = useMemo(
    () =>
      SizeUnits.filter((type) => !excludeTypes?.includes(type)).map((type) => ({
        value: type,
        label: type,
      })),
    [excludeTypes],
  );

  const handleChange = (partial: Partial<SizeValue>) => {
    changeValue({ ...innerValue, ...partial });
  };

  return (
    <SizePickerContainer style={style} $width={width}>
      {innerValue?.unit !== 'auto' && (
        <InputNumber
          size={size}
          style={{ width: '100%' }}
          min={0}
          {...restProps}
          value={innerValue?.number}
          onChange={(val) =>
            handleChange({
              number: val !== null ? parseInt(val.toString()) : undefined,
            })
          }
        />
      )}
      <Select
        value={innerValue?.unit}
        style={{ width: 40 }}
        variant="borderless"
        suffixIcon={null}
        size={size}
        popupMatchSelectWidth={false}
        onChange={(val) => handleChange({ unit: val })}
        dropdownStyle={{ minWidth: 60 }}
        options={options}
      />
    </SizePickerContainer>
  );
};

export default SizePicker;
