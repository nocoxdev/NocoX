import { useState } from 'react';
import { useControllableValue } from 'ahooks';
import { ColorPicker } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import { useTheme } from 'styled-components';

export interface BackgroundColorValueType {
  backgroundColor?: string;
}

export interface ColorPanelProps {
  onChange?: (value: BackgroundColorValueType) => void;
  defaultValue?: BackgroundColorValueType;
  value?: BackgroundColorValueType;
  size?: SizeType;
  variant?: Variant;
}

const ColorPanel = (props: ColorPanelProps) => {
  const [value, setValue] = useControllableValue<
    BackgroundColorValueType | undefined
  >(props);
  const [open, setOpen] = useState(false);
  const { size, variant } = props;
  const theme = useTheme();

  const filled = variant === 'filled';

  return (
    <ColorPicker
      placement="bottom"
      value={value?.backgroundColor}
      onChange={(color) => setValue({ backgroundColor: color.toHexString() })}
      open={open}
      onOpenChange={(val) => setOpen(val)}
      onClear={() => setValue(undefined)}
      size={size}
      style={
        filled
          ? {
              background: theme.colorFillTertiary,
              border: theme.colorFillTertiary,
            }
          : {}
      }
      showText
      allowClear
    />
  );
};

export default ColorPanel;
